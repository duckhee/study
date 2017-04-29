var http = require('http') ;
var express = require('express') ;
var mysql = require('mysql') ;
var bodyParser = require('body-parser') ;
var path = require('path') ;
var cookieParser = require('cookie-parser') ;
var expressSession = require('express-session') ;
var multer = require('multer') ;
var morgan = require('morgan') ;
var ejs = require('ejs') ;
var cors = require('cors') ;
var socketio = require('socke.io') ;
var net = require('net') ;
var mqtt = require('mqtt') ;
var fs = require('fs') ;
var formidable = require('formidable') ;

var app = express() ;

app.set('port', process.env.PORT || 5000) ;

app.set('views', path.join(__dirname, 'views')) ;

app.set('view engine', 'ejs') ;

app.use(bodyParser.json()) ;

app.use(express.static(path.join(__dirname, 'public'))) ;

app.ues(bodyParser.urlencoded({
	extended: false,
}) ;

http.createServer(app).listen(app.get('port', function(){
	consoel.log('server start at http://localhost:' + app.get('port')) ;


