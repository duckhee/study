var http = require('http') ;
var fs = require('fs') ;
var socketio = require('socket.io') ;

var server = http.createServer(function(req, res) {
	fs.readFile('HTMLPage.html', function(error, data) {
		res.writeHead(200, {'Content-Type':'text/html'}) ;
		res.end(data) ;
	}) ;
}).listen(52273, function() {
	console.log('Server running at http://localhost:52273') ;
}) ;

var io = socketio.listen(server) ;
io.sockets.on('connection', function(socket) {
	socket.on('rint', function(data) {
		console.log('Client Send Data:', data) ;

		io.sockets.emit('smart', data) ;
	}) ;
}) ;


