module.exports.signin = function(req, res){
    res.status(200).send({status: true, message: 'hello'});
}

module.exports.token = function(req, res){
    if (req.body.grant_type === 'password' && req.body.username && req.body.password) {
		var session = req.session;

		session.authorized = true;
		session.email = req.body.username;
		session.password = req.body.password;

		res.status(200).send('{ "access_token": "secret token!", "account_id": 1 }');
	}else {
		res.status(400).send('{ "error": "invalid" }');
	}
}