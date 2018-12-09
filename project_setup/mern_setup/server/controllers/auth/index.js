const jwt = require('jwt-simple');
const bcrypt = require('../../services/bcrypt');
const { jwtConfig } = require('../../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ uid: user.id, ts: timestamp }, jwtConfig.secret);
}

function userDataToSend(user){
    return {
        avatar: user.avatar,
        displayName: user.displayName,
        email: user.email,
    }
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
    const { password } = req.body;

    try {

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt, null);

        res.send({
            success: true,
            message: 'Sign Up Controller',
            hash
        });
    } catch(err) {
        console.log('Sign Up Error:', err);

        res.status(400).send({
            success: false,
            error: 'Something failed'
        });
    }
}
