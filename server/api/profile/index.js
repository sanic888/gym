var authService = require('./../../api/auth/auth');
var userService = require('./../../services/user');
var validation = require('./validation/validation');
var error = require('./../../infrastructure/error');

module.exports.createProfile = function(req, res){
    // validate
    validation.validate(req).then(function(result){
        if(result.error.hasErrors()){
            res.status(422).send({ errors: result.error.errors});  
        }else {
            userService.create({
                login: result.data.login,
                email: result.data.email,
                firstName: result.data.firstName,
                lastName: result.data.lastName
            }).then(function(user){
                res.status(201).send(user);
            }).catch(function(e){
                res.status(400).send({ errors: e });
            });
        }
    }).catch(function(e){
        console.dir(e);
        res.status(400).send({ errors: e });
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