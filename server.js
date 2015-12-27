// boot up application
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public')); 	// server static files from ./public

app.get('/', function(req, res){
	res.sendFile(__dirname + './assets/index.html');
});

port = process.env.PORT || 3000;

app.listen(port);

console.log('\'Helping Children\' is listening to port ' + port);