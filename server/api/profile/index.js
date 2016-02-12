var authService = require('./../../api/auth/auth');
var userService = require('./../../services/user');
var validation = require('./validation/validation');
var error = require('./../../infrastructure/error');

module.exports.createProfile = function(req, res){
    validation.validate(req).then(function(validation){
        if(validation.hasErrors()){
            res.status(422).send({ errors: validation.errors});  
        }else {
            userService.create({
                login: validation.data.login,
                email: validation.data.email,
                firstName: validation.data.firstName,
                lastName: validation.data.lastName
            }).finally(function(){
                res.status(201).send({});
            });
        }
    });
};

module.exports.revoke = function(req, res){
    res.status(200).send({status: true, message: 'hello'});
};

module.exports.token = function(req, res){
    if (req.body.grant_type === 'password' && req.body.username && req.body.password) {
        authService.signin(req, res, "/", function (er) {
            var errorResponse = new error()
            errorResponse.addError('password', er);
            console.dir(errorResponse);
            return res.status(400).send(errorResponse);
        });
	}else {
		res.status(400).send('{ "error": "invalid" }');
	}
};