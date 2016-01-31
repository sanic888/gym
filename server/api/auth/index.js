'use strict';

var express = require('express');

var userService = require('./../../services/user');
// Passport Configuration
require('./local/passport').setup(userService);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;