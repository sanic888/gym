module.exports = function(app) {
	var api = require('glob').sync('./mocks/**/*.js', { cwd: __dirname }).map(require);
	var bodyParser = require('body-parser');
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

	api.forEach(function(route) {
		route(app); 
	});
};