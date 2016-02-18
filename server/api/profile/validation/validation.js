var q = require('q');
var userService = require('./../../../services/user');
var errorService = require('./../../../infrastructure/error');

module.exports.validate = function(req){
	var defer = q.defer(),
		// all parameters
		login = (req.body.profile.login || '').trim(),
        email = (req.body.profile.email || '').trim().toLowerCase(),
        firstName = req.body.profile.firstName,
        lastName = req.body.profile.lastName;

    // validate email
	req.checkBody('profile.email', 'Email is incorrect.').isEmail();

	// initialize error object
	var errors = new errorService(req.validationErrors());

	// check login
	!login && errors.addError('login', 'Login is required.');

	if(errors.hasErrors()){
		defer.resolve({
			error: errors
		});
	}else {
		userService.getByEmailOrLogin(email, login).then(function(user){
			if(user){
				if(user.email === email){
		            errors.addError('email', 'User with such email has already registered.');
		        }
		        if(user.login === login){
		            errors.addError('login', 'User with such login has already registered.');
		        }
			}

			defer.resolve({
				data: {
		            login: login,
		            email: email,
		            firstName: firstName,
		            lastName: lastName
				}, 
				error: errors
			});
		}).catch(function(e){
			errors.addError(e);

			defer.resolve({
				error: errors
			});
		});
	}

	return defer.promise;
}