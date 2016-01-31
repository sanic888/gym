var express = require('express');
var controller = require('./index');
var router = express.Router();

router.get('/signin', controller.signin);
router.post('/token', controller.token);

module.exports = router;

// module.exports = function(app) {
// 	var express = require('express');
// 	var router = express.Router();

// 	router.post('/token', function(req, res) {
// 		if (req.body.grant_type === 'password' && req.body.username && req.body.password) {
// 			var session = req.session;

// 			session.authorized = true;
// 			session.email = req.body.username;
// 			session.password = req.body.password;

// 			res.status(200).send('{ "access_token": "secret token!", "account_id": 1 }');
// 		}else {
// 			res.status(400).send('{ "error": "invalid" }');
// 		}
// 	});

// 	router.post('/revoke', function(req, res) {
// 		if (req.body.token_type_hint === 'access_token' || req.body.token_type_hint === 'refresh_token') {
// 			res.status(200).end();
// 		} else {
// 			res.status(400).send('{ "error": "unsupported_token_type" }');
// 		}
// 	});

// 	app.use('/', router);
// };
