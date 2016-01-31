'use strict';

var passport = require('./../../infrastructure/passport');
var config = require('./../../config');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var userService = require('./../../services/user');
var validateJwt = expressJwt({ secret: config.secrets.session });
var _ = require('lodash');

var auth = {};

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
auth.isAuthenticated = function() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      userService.findById(req.user._id)
        .then(function(user){
          if (!user) return res.send(401);
          req.user = user;
          next();
        })
        .fail(function(err){
          next(err);
        })
        .done();
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
auth.hasRole = function(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (_.contains(req.user.roles, roleRequired)) {
        next();
      }
      else {
        res.send(403);
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
auth.signToken = function(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: 60*5 });
}

/**
 * Set token cookie directly for oAuth strategies
 */
auth.setTokenCookie = function(req, res) {

  var token = signToken(req.user._id);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}


auth.signin = function(req, res,successReturnToOrRedirect, next){
      console.log('-----------------------2---------------------');
    passport.authenticate('local',  function(err, user, info) {
      console.log('-----------------------3---------------------');
        if (err) { return next(err); }
        if (!user) { next("There's no such user or the email or password are typed incorrectly");}
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.status(200).send({access_token: user._id, account_id: 1 });
            // return res.redirect(successReturnToOrRedirect);
        });

    })(req, res, next);
};


module.exports = auth;
