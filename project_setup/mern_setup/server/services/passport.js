const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const mysql = require('mysql');
const bcrypt = require('./bcrypt');
const db = require('../db');


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
        console.log('Local Login Error', err);
        done(err);
    }
    

    // User.findOne({ email: email }, function (err, user) {
    //     if (err) { return done(err); }
    //     if (!user) { return done(null, false); }

    //     user.comparePassword(password, function (err, isMatch) {
    //         if (err) { return done(err); }
    //         if (!isMatch) { return done(null, false); }

    //         return done(null, user);
    //     });
    // });
});

// const jwtOptions = {
//     jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//     secretOrKey: config.secret
// };

// const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
//     User.findById(payload.sub, function (err, user) {
//         if (err) { return done(err, false); }

//         if (user) {
//             done(null, user);
//         } else {
//             done(null, false);
//         }
//     });
// });

// passport.use(jwtLogin);
passport.use(localLogin);

module.exports = {
    requireSignIn: passport.authenticate('local', { session: false })
}

async function comparePassword(candidatePassword, user){
    try {
        return isMatch = bcrypt.compare(candidatePassword, user.password);
    } catch (err){
        return false;
    }
}
