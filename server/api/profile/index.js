var authService = require('./../../api/auth/auth');
var ErrorResponse = require('./../../infrastructure/apiErrorResponse');

module.exports.signin = function(req, res){
    res.status(200).send({status: true, message: 'hello'});
};

module.exports.revoke = function(req, res){
    console.log('---------------------------hello111111111');
    res.status(200).send({status: true, message: 'hello'});
};

module.exports.token = function(req, res){
    console.log('------------hello222222222222222222222222');
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