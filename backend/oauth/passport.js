const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const gclass = require('./../gclass/gclass');
const schema = require('./../db/schema.js');
var User = schema.User;

const host = process.env.HOST || '127.0.0.1';

const port = process.env.PORT || 3000;

const scope = [
  'https://www.googleapis.com/auth/classroom.courses',
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.students',
  'profile'
];

const callbackURL = `http://${host}:${port}/login/google/return`

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: callbackURL,   
    scope: scope
  },

  function(accessToken, refreshToken, profile, done) {

    profile.access = accessToken;

    gclass.getCourses(profile)
    .then((results) => {
      profile.courses = results.data.courses;
      return done(null, profile);
    })
    .catch((err) => {
      console.log('error in getting classes:', err)
      profile.courses = [];
      return done(err, profile);
    });
  })
);

passport.serializeUser(function(user, cb) {
  console.log('serializing user')
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  console.log('deserializing user')
  cb(null, obj);
});

module.exports = passport;