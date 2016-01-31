module.exports = function(app) {
	var glob = require('glob').sync; 
	var api = glob('./api/**/router.js', { cwd: __dirname }).map(require);
	var bodyParser = require('body-parser');
	var session = require('express-session');
	var MongoStore = require('connect-mongo/es5')(session);
	var passport = require('./infrastructure/passport');
	var config = require('./config');

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

	app.use('/accounts', require('./api/account/router'));
	app.use('/', require('./api/profile/router'));
	app.use('/auth', require('./api/auth'));

	// // Log proxy requests
	// var morgan  = require('morgan');
	// app.use(morgan('dev'));
};