var net = require('net') ;
var server = net.createServer(function (socket) {
	socket.name = socket.remoteAddress + ':' + socket.remotePort ;
	console.log('socket name : ' + socket.name) ;

	socket.on('data', function(data) {
		console.log('data ' + data) ;
		socket.write(data + ' from server') ;

	}) ;

	socket.on('end', function() {
		console.log('server end') ;
	}) ;

}) ;

var port = 3000 ;
server.listen(port) ;

console.log('server start : 3000') ;


