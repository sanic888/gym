var passport = require('passport');
var userService = require('./../services/user');
var LocalStrategy = require('passport-local').Strategy;

var compareTextWithHash = function(text, hash){
	var deferred = Q.defer();

	bcrypt.compare(text, hash, function(err, res) {
		if(err){
			deferred.reject(err);
		} else {
			deferred.resolve(res);
		}
	});

	return deferred.promise;
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    userService.findById(user._id).then(function(user){
        return done(null, user);
    }).done();
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    },
    function (email, password, done) {
        //This is used for internal purpose, when we need authorize user without actual password
        //One of the cases is auto-login after he verify his email
        if (password === 'login_by_token') {
            var token = email;
            userService.findByToken(token)
                .then(function (user) {
                    if (!user) {
                        return done(null, false, {message: 'This email is not registered.'});
                    }

                    return done(null, user);
                })
                .done();
        } else {
            userService.getByEmail(email)
                .then(function (user) {
                    if (!user) {
                        return done(null, false, {message: 'This email is not registered.'});
                    }
                    compareTextWithHash(password, user.hash).then(function (res) {
                        if (res) {
                            return done(null, user);
                        }
                        return done(null, false, {message: 'This password is not correct.'});
                    });
                })
                .done();
        }
    }
));

module.exports = passport;