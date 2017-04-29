var http = require('http') ;
var express = require('express') ;
var path = require('path') ;
var bodyParser = require('body-parser') ;
var static = require('serve-static') ;
var expressErrorHandler = require('express-error-handler') ;
var fs = require('fs') ;

var app = express() ;

app.set('port', process.env.PORT || 3000) ;

app.use(bodyParser.urlencoded({
	extended: false
})) ;

app.use(bodyParser.json()) ;

app.use('/public', static(path.join(__dirname, 'public'))) ;

var router = express.Router() ;

router.route('/process/save').post(function(req, res) {
	console.log('process save function') ;

	try{
		var paramAuthor = req.body.auther ;
		var paramCreateDate = req.body.createDate ;
		var paramContent = req.body.contents ;
		
		console.log(paramAuthor) ;
		console.log(paramContent) ;
		console.log(paramCreateDate) ;

		res.writeHead(200, {'Content-Type':'text/html; charset = utf8'}) ;
		res.write('<div><p>memo save complete</p></div>') ;
		res.write('<div><input type = "button" value = "save" onclick = "javascript:history.back()"></div>') ;
		res.end() ;
	} catch(err) {
		console.dir(err.stack) ;

		res.writeHead(400, {'Content-Type':'text/html; charset = utf8'}) ;
		res.write('<div><p>error page</p></div>') ;
		res.end() ;
	}
}) ;

app.use('/', router) ;

var errorHandler = expressErrorHandler({
	static: {
		'404':'./public/404.html'
	}
}) ;

app.use(expressErrorHandler.httpError(404)) ;

app.use(errorHandler) ;

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('server start localhost:' + app.get('port')) ;
}) ;


