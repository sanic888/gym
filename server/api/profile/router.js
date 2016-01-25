var express = require('express');
var controller = require('./index');
var router = express.Router();

router.get('/signin', controller.signin);
router.post('/token', controller.token);

module.exports = function(app) {
	app.use('/', router);
}