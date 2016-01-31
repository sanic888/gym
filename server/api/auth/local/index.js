'use strict';

var express = require('express');
var passport = require('./../../../infrastructure/passport');
var auth = require('../auth');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
  	console.log('-----------------------5------------------------');
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    var token = auth.signToken(user._id);
    res.json({token: token});
  })(req, res, next)
});



module.exports = router;