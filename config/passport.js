var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../database/models/user')

passport.use(
  new LocalStrategy(
    {},

    (username, password, done) => {
      User.findAll({ where: { username: username } }, function (err, user) {
        if (err) {
          return done(err);
        }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        if (user.password != password) {
          return done(null, false, {
            message: "mot de passe incorrect"
          })
        }
        // Return if password is wrong

        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  )
);
