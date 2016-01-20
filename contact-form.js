// CONTACT FORM IN JADE
form#contact-form(action='/contactform', method='post')
	.input-group
		span.input-group-addon
			| topic
		input.form-control(type='text', name='subject', minlength='2', required)
	.input-group
		span.input-group-addon
			| message
		textarea.form-control(name='message', minlength='2', required)
	.input-group
		span.input-group-addon
			| name
		input.form-control(type='text', name='author', minlength='2', required)
	.input-group
		span.input-group-addon
			| email
		input.form-control(type='email', name='subject', minlength='2', required)
	button.btn(type="submit") send

// SASS TO STYLE
#contact-form
	.input-group
		margin-top: 15px
		.input-group-addon
			width: 75px
			padding: 0
			margin: 0
			background-color: $brand-black
			color: $brand-accent
			border: 1px black solid
		textarea
			height: 150px !important
			resize: none
	.btn
		background-color: $brand-black
		color: $brand-accent
		border: 1px black solid
		margin: 20px 0
		width: 75px

// jQUERY TO SET ELEMENT WIDTHS

// sets the width of the form controls of the contact form based off of the containing form div
(function(){

	function sizeContactForm() {
		var width = $('#contact-form').width() * .8;

		$('#contact-form .form-control').each( function(){
			$(this).width(width);
		});
	}

	$(document).ready(sizeContactForm);

	$(window).resize(sizeContactForm);

}());

// ROUTE RECEIVER FOR CONTACT FORM
app.post('/contactform', bodyParser.urlencoded({ extended: true }), function(req, res){		// send email with posted data
	
	var automatedMessage = 'This is an automated message from [SERVERNAME]. If you would like to respond to the sender, please write to the email listed below. Do NOT reply to this address.';
		
	var mailOptions = {
		from: req.body.sender + '<' + req.body.email + '>',
		to: 'alexjhannan@gmail.com',
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