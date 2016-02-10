var q = require('q');
var userService = require('./../../../services/user');
var errorService = require('./../../../infrastructure/error');

module.exports.validate = function(req){
	var defer = defer();

	req.body.profile.email = (req.body.profile.email || '').trim().toLowerCase();
	req.checkBody('profile.email', 'Email is incorrect.').isEmail();

	var errors = new errorService(req.validationErrors());

	userService.findByEmail(req.body.email).then(function(user){
		if(user){
            errorService.addError('email', 'User with such email has already registered.');
		}
	}).catch(function(e){
		errorService.addError(e)
	}).finally(function(){
		defer.resolve({
			data: {
	            login: req.body.profile.login,
	            email: req.body.profile.email,
	            firstName: req.body.profile.firstName,
	            lastName: req.body.profile.lastName
			}, 
			error: errorService
		});
	});

	return defer.promise;
}