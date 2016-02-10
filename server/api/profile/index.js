var authService = require('./../../api/auth/auth');
var userService = require('./../../services/user');
var ErrorResponse = require('./../../infrastructure/apiErrorResponse');

module.exports.createProfile = function(req, res){
    userService.create({
        login: req.body.profile.login,
        email: req.body.profile.email,
        firstName: req.body.profile.firstName,
        lastName: req.body.profile.lastName
    }).finally(function(){
        res.status(200).send({status: true, message: 'hello'});     
    });
};

module.exports.revoke = function(req, res){
    res.status(200).send({status: true, message: 'hello'});
};

module.exports.token = function(req, res){
    if (req.body.grant_type === 'password' && req.body.username && req.body.password) {
        authService.signin(req, res, "/", function (error) {
            var errorResponse = new ErrorResponse()
            errorResponse.addError('password', error);
            console.dir(errorResponse);
            return res.status(400).send(errorResponse);
        });
	}else {
		res.status(400).send('{ "error": "invalid" }');
	}
};