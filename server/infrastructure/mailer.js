var nodemailer = require('nodemailer');
var config = require('./../config');
var handlebars = require('handlebars-precompiler');
var path = require('path');
handlebars.do({
    templates : ['./server/templates/complete_registration.hbs'],
    output: './server/infrastructure/templates.js'
});


// console.log(path.normalize(__dirname + './templates.js'));
// console.log(path.normalize(__dirname));


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    pool: true,
    service: 'Gmail',
    auth: {
        user: config.gmail.email,
        pass: config.gmail.pass
    },
    logger: true, // log to console
    debug: true // include SMTP traffic in the logs
}, {
    // sender info
    from: config.gmail.email
});

module.exports.sendRegistrationMessage = function(to){
	console.log('--------sendRegistrationMessage---------');
	var template = require('./templates');
	console.dir(template);
	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'Alex ' + config.gmail.email, // sender address
	    to: to,
	    subject: 'Complete Registration', // Subject line
	    html: template['complete_registration.hbs'] // html body
	};

	console.log('--------sendRegistrationMessage111111111---------');

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
};