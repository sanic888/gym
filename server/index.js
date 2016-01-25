module.exports = function(app) {
	var api = require('glob').sync('./mocks/**/*.js', { cwd: __dirname }).map(require);
	var bodyParser = require('body-parser');
	var session = require('express-session');
	var MongoStore = require('connect-mongo')(session);
	var passport = require('./infrastructure/passport.js');
	var config = require('./config.js');

	app.use(session({
		store: new MongoStore({url: config.mongo.session}),
		secret: config.secrets.session,
		resave: true,
		saveUninitialized: true
	}));
	app.use(bodyParser.json({ type: 'application/*+json' }));
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	// Log proxy requests
	var morgan  = require('morgan');
	app.use(morgan('dev'));

	api.forEach(function(route) {
		route(app); 
	});
};