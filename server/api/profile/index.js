var authService = require('./../../api/auth/auth');
var ErrorResponse = require('./../../infrastructure/apiErrorResponse');

module.exports.signin = function(req, res){
    res.status(200).send({status: true, message: 'hello'});
}

module.exports.token = function(req, res){
    if (req.body.grant_type === 'password' && req.body.username && req.body.password) {
    	console.log('-----------------------1---------------------');
    	
        authService.signin(req, res, "/", function (error) {
            var errorResponse = new ErrorResponse()
            errorResponse.addError('password', error);
            console.log('------------------------------------------------');
            console.dir(errorResponse);
            return res.status(400).send(errorResponse);
        });
		
		// var session = req.session;

		// session.authorized = true;
		// session.email = req.body.username;
		// session.password = req.body.password;

		// res.status(200).send('{ "access_token": "secret token!", "account_id": 1 }');
	}else {
		res.status(400).send('{ "error": "invalid" }');
	}
}