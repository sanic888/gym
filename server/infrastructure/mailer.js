var nodemailer = require('nodemailer');
var config = require('./../config');

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

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Alex sanic888@gmail.com', // sender address
    to: 'sanic888@gmail.com, ayancharuk@exadel.com', // list of receivers
    subject: 'Complete Registration ✔', // Subject line
    html: 'For complete registration' // html body
};

module.exports.sendRegistrationMessage = function(to){
	mailOptions.to = ''
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
};