var fs = require('fs') ;
var readline = require('readline') ;

function processFile(filename) {
	var instream = fs.createReadStream(filename) ;
	var reader = readline.createInterface(instream, process.stdout) ;

	var count = 0 ;

	reader.on('line', function(line) {
		console.log('one line' + line) ;

		count += 1 ;

		var tokens = line.split(' ') ;
		if(tokens != undefined && tokens.length > 0) {
			console.log('#' + count + '->' + tokens[0] ) ;
		}
	}) ;

	reader.on('close', function(line) {
		console.log('close server') ;
	}) ;
}

var filename = './test.txt' ;
processFile(filename) ;

