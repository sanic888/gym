var passport = require('passport');
var userService = require('./../services/user');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    userService.findById(user._id).then(function(user){
        return done(null, user);
    }).done();
});

module.exports = passport;