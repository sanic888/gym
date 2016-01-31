var passport = require('./../../../infrastructure/passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var Q = require('q');

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

exports.setup = function (userService) {
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password' // this is the virtual field on the model
        },
        function (email, password, done) {
            console.log('-----------------------4---------------------');
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

                        compareTextWithHash(password, user.password).then(function (res) {
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
};