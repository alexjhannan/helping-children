// boot up application
var express = require('express');
var app = express();

// email modules
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


// smtp configuration
var smtpTransport = nodemailer.createTransport(process.env.LOGIN);

// routing
app.use(express.static(__dirname + '/public')); 	// serve static files from ./public

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/html/landing.html');
});

app.get('/books', function(req, res){
	res.sendFile(__dirname + '/public/html/books.html');
});

app.get('/about', function(req, res){
	res.sendFile(__dirname + '/public/html/about.html');
});

app.get('/mentions', function(req, res){
	res.sendFile(__dirname + '/public/html/mentions.html');
});

app.get('/contact', function(req, res){
	res.sendFile(__dirname + '/public/html/contact.html');
});

app.post('/contactform', bodyParser.urlencoded({ extended: true }), function(req, res){		// send email with posted data
	
	var automatedMessage = 'This is an automated message from www.alcoholismhurtskids.com. If you would like to respond to the sender, please write to the email listed below. Do NOT reply to this address.';
		
	var mailOptions = {
		from: req.body.sender + '<' + req.body.email + '>',
		to: 'carolynhannan@comcast.net',
		subject: req.body.subject,
		text: automatedMessage + req.body.message + 'From: ' + req.body.sender + 'Email:' + req.body.email,
		html: '<p><strong>' + automatedMessage + '</p></strong>' + '<br /><p>' + req.body.message + '<br /><br />From: ' + req.body.sender + '<br />Email: ' + req.body.email +'</p>'
	}
	
	smtpTransport.sendMail(mailOptions, function(err, res){
		if (err) { console.log(err); }
		else { console.log('Message sent ');}
	});
	
	res.redirect('/');
	
});

port = process.env.PORT || 3000;

app.listen(port);

console.log('\'Helping Children\' is listening to port ' + port);