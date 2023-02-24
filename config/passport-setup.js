require('dotenv').config();
const passport = require('passport');
const Auth = require('../model/auth');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Local passport registration
passport.use(Auth.createStrategy());


//Sign in with Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://report-03i2.onrender.com/auth/google/secrets'
}, (accessToken, refreshToken, profile, cb) => {
  Auth.findOrCreate({ googleId: profile.id, username: profile.displayName }, (err, user) => {
    return cb(err, user);
  })
})
)

//Sign in with Github

passport.serializeUser(function (user, done) {
  done(null, user);
  module.exports = user
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
