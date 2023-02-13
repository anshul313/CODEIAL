const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new GoogleStrategy({
    clientID:'537996851020-6s6hpg2soj00ch1d6ou5jo5ec0k9b5l9.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.emails[0].value }).exec(function(err,user){
        if(err){
            console.log('error in google strategy passport',err);
            return;
        }

        console.log(profile);
        if(user){
            return done(null,user)
        }else{
            User.create({
                name:profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('error in google strategy passport',err);
                    return;
                }else{
                    return done(null.user);
                }
            })
        }
    })
  }
));

module.exports = passport;