var net = require('net') ;
var hostname = 'localhost' ;
var port = 3000 ;

var client = new net.socket() ;

client.connect(port, hostname, function() {
	console.log('server connection : ' + hostname + ':' + port) ;
	clinet.write('hello') ;
}) ;

client.on('data', function(data) {
	console.log('data : ' + data) ;
	client.destory() ;
}) ;

client.on('close', function() {
	console.log('client close') ;
}) ;

