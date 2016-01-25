var express = require('express');
var controller = require('./index');
var router = express.Router();

router.get('/1', controller.get1);

module.exports = function(app) {
	app.use('accounts', router)
}