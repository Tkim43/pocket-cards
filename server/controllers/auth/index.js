const jwt = require('jwt-simple');
const mysql = require('mysql');
const db = require('../../db');
const bcrypt = require('../../services/bcrypt');
const { jwtConfig } = require('../../config');


const avatars = {
    'crab': '/avatars/crab.png',
    'crocodile': '/avatars/crocodile.png',
    'fish': '/avatars/fish.png',
    'frog': '/avatars/frog.png',
    'rabbit': '/avatars/rabbit.png',
    'reindeer': '/avatars/reindeer.png',
    'turtle': '/avatars/turtle.png'
}

exports.signIn = (req, res) => {
    const { user } = req;
    res.send({
        success: true,
        token: tokenForUser(user),
        user: userDataToSend(user)
    });
}

exports.signUp = async (req, res) => {
    const { displayName, email, password, avatar } = req.body;

    try {
        const errors = [];

        if(!email) errors.push('No email address provided');
        else if (!emailIsValid(email)) errors.push('Email address is not valid');

        if(!password) errors.push('No password provided');
        else if (!passwordIsValid(password)) errors.push('Password is not valid');

        if(!displayName) errors.push('No username provided');

        if(errors.length){
            return res.status(422).send({errors});
        }

        let queryForExistingUsers = 'SELECT * FROM users WHERE ?? = ? OR ?? = ? LIMIT 1';
        let insertsForExistingUsers = ['email', email, 'displayName', displayName];

        let sqlExistingUsers = mysql.format(queryForExistingUsers, insertsForExistingUsers);

        const foundUsers = await db.query(sqlExistingUsers);

        let existingEmail = false;
        let existingDisplayName = false;

        if(foundUsers.length){
            foundUsers.map(user => {
                existingEmail = user.email === email;
                existingDisplayName = user.displayName = displayName;
            });

            if(existingEmail) errors.push('Email address already in use');
            if(existingDisplayName) errors.push('Username already in use');

            if(errors.length){
                return res.status(422).send({ errors });
            }
        }

        const hash = await hashPassword(password);

        const userAvatar = avatars[avatar] || avatars['crab'];

        const queryInsertUser = 'INSERT INTO users (??, ??, ??, ??) VALUES (?, ?, ?, ?)';
        const insertsInsertUser = ['displayName', 'email', 'password', 'avatar', displayName, email, hash, userAvatar];

        const sqlInsertUser = mysql.format(queryInsertUser, insertsInsertUser);

        const { insertId } = await db.query(sqlInsertUser);

        if(!insertId){
            return res.status(500).send(['Error creating new user']);
        }

        const user = {
            ID: insertId,
            email,
            displayName,
            userAvatar
        }

        res.send({
            success: true,
            token: tokenForUser(user),
            user: userDataToSend(user)
        });
    } catch(err) {
        res.status(500).send({
            errors: ['Error creating new user']
        });
    }
}

async function hashPassword(password){
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt, null);
}

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ uid: user.ID, ts: timestamp }, jwtConfig.secret);
}

function userDataToSend(user) {
    return {
        userID: user.ID,
        avatar: user.avatar || null,
        displayName: user.displayName,
        email: user.email,
    }
}

function emailIsValid(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function passwordIsValid(password) {
    return /^[a-zA-Z]{1}[a-zA-Z0-9]{5,31}/g.test(password);
}
