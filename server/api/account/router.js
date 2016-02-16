var express = require('express');
var controller = require('./index');
var router = express.Router();

router.get('/1', function(req, res){
	if (/Bearer .+/.test(req.headers.authorization)) {
		// delay this a bit so we see the loading template
		setTimeout(function() {
			res.status(200).send({
				account: {
					type: 'accounts',
					id: '1',
					attributes: {
						login: 'letme',
						name: 'Some person'
					}
				}
			});
		}, 1000);
	} else {
		res.status(401).end();
	}
});

module.exports = router;
