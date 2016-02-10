var express = require('express');
var controller = require('./index');
var router = express.Router();

router.post('/token', controller.token);
router.post('/revoke', controller.revoke);
router.post('/profiles', controller.createProfile);

module.exports = router;

