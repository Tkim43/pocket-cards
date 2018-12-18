const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const mysql = require('mysql');
const bcrypt = require('./bcrypt');
const db = require('../db');
const { jwtConfig } = require('../config');


const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async function (email, password, done) {
    try {
        let query = 'SELECT * FROM users WHERE ?? = ? LIMIT 1';
        let inserts = ['email', email];

        let sql = mysql.format(query, inserts);

        const [user] = await db.query(sql);

        if(!user) return done(null, false);
        
        const isMatch = await comparePassword(password, user);

        if(!isMatch) return done(null, false);

        return done(null, user);
    } catch(err){
        done(err);
    }
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: jwtConfig.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async function (payload, done) {
    console.log("Damnit 6");
    try {
        let query = 'SELECT * FROM users WHERE ?? = ? LIMIT 1';
        let inserts = ['id', payload.uid];

        let sql = mysql.format(query, inserts);

        const [user] = await db.query(sql);

        if(user) return done(null, user);

        return done(null, false);
    } catch(err){
        done(err);
    }
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = {
    requireAuth: passport.authenticate('jwt', { session: false }),
    requireSignIn: passport.authenticate('local', { session: false })
}

async function comparePassword(candidatePassword, user){
    try {
        return await bcrypt.compare(candidatePassword, user.password);
    } catch (err){
        return false;
    }
}
