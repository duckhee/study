var express = require('express') ;
var app = express() ;
var http = require('http') ;



app.use(function (request, response) {
	var agent = request.header('User-Agent') ;

	if(agent.toLowerCase().match(/chrome/)) {
		response.send('<h1>Hello Chrome...</h1>') ;
	} else {
		response.send('<h1>Hello Express...</h1>') ;
	}
}) ;




http.createServer(app).listen(52273, function() {
	console.log('server running http://localhost:52273') ;
}) ;
