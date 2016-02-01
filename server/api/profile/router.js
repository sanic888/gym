var express = require('express');
var controller = require('./index');
var router = express.Router();

router.get('/signin', controller.signin);
router.post('/token', controller.token);
router.post('/revoke', controller.revoke);

module.exports = router;

