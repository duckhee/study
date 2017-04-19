var http = require('http') ;
var fs = require('fs') ;
var sockeio = require('socket.io') ;

var server = http.createServer(function(req, res) {
	fs.readFile('HTMLPage.html', function(error, data) {
		res.writeHead(200, {'Content-Type':'text/html'}) ;
		res.end(data) ;
	}) ;
}).listen(52273, function() {
	console.log('Server running at http://localhost:52273') ;
}) ;

