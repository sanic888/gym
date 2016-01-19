module.exports = function(app) {
	var globSync   = require('glob').sync;
	var bodyParser = require('body-parser');
	var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
	var session = require('express-session');

	app.use(session({
		secret: 'HDjhs&*&@782hj3jОГ',
		resave: true,
		saveUninitialized: true,
	}));
	app.use(bodyParser.json({ type: 'application/*+json' }));
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	// Log proxy requests
	var morgan  = require('morgan');
	app.use(morgan('dev'));

	mocks.forEach(function(route) { route(app); });
};