var http = require('http') ;
var express = require('express') ;
var net = require('net') ;
var fs = require('fs') ;
var socketio = require('socket.io') ;
var path = require('path') ;
var bodyParser = require('body-parser') ;
var cookieParser = require('cookie-parser') ;
var expressSession = require('express-session') ;
var mysql = require('mysql') ;
var ejs = require('ejs') ;
var multer = require('multer') ;
var cors = require('cors') ;

var formidable = require('formidable') ;

var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'won1228',
	database: 'smart',
	debug: false
}) ;

var db = mysql.createConnection({
	name: 'root',
	password: 'won1228',
	database: 'smart'
}) ;

var app = express() ;

app.set('port', process.env.PORT || 5000) ;

app.set('views', path.join(__dirname, '/views')) ;

app.set('view engine', 'ejs') ;

app.use(bodyParser.json()) ;

app.use(express.static(path.join(__dirname, '/public'))) ;

app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) ;

app.use(bodyParser.urlencoded({
	extended: false,
})) ;

http.createServer(app).listen(app.get('port'), function(){
	console.log('server start at http://localhost:' + app.get('port')) ;
}) ;

app.get('/', function(req, res){
	res.render('./index') ;

}) ;

app.get('/login', function(req, res){
	
	res.render('./member/loginpage_2') ;

}) ;

app.post('/process/login', function(req, res){
	var id = req.params.id || req.query.id ;
	var password = req.params.password || req.query.password ;

	console.log('id :' + id + ' password : ' + password) ;

	



//	if(pool){
//		authUser(id, password, function(err, rows) {
//
//			if(err){
//				console.error('error : ' + err.stack) ;
//
//				res.redirect('/') ;
//				return ;
//			}
//			if(rows){
//				console.dir(rows) ;
//
//				var username = rows[0].name  ;
//
//				res.writeHead('200', {'Content-Type':'text/html;charset = utf8'}) ;
//				res.write('<h1>login sucess</h1>') ;
//				res.end(username) ;
//			}else {
//				res.redirect('/login') ;
//			} 
//		}) ;
//	} else{
//		console.log('database error') ;
//		console.error(err.stack) ;
//		res.redirect('/') ;
//	}


	res.redirect('/') ;
}) ;



app.get('/registe', function(req, res){
	res.render('./member/registepage_2') ;

}) ;

app.post('/process/registe', function(req, res) {
	console.log('/process/registe called') ;
	
	var id = req.body.id || req.query.id ;
	var password = req.body.password || req.query.password ;
	var name = req.body.name || req.query.name ;
	var sex = req.body.sex || req.query.sex ;
	var email = req.body.email || req.query.email ;

	console.log('id : ' + id + 'password : ' + password + 'name : ' + name + 'sex : ' + sex + 'email : ' + email) ;

	if(pool) {
		addUser(id, password, name, sex, email, function(err, addedUser) {
			if(err){
				console.error('add user error : ' + err.stack) ;

				return res.redirect('/registe') ;
			
			}

			if(addedUser){
				console.dir(addedUser) ;

				console.log('inserted ' + result.affectedRows + ' rows') ;
				var insertId = result.insertId ;
				console.log('add recod id : ' + insertId) ;
				res.redirect('/login') ;

			} else{
				res.writeHead('200', {'Content-Type':'text/html; charset = utf8'}) ;
				res.write('<h2>failed</h2>') ;
				res.end() ;
			}
		}) ;
	} else{
		res.writeHead('200', {'Content-Type':'text/html;charset = utf8'}) ;
			res.write('<h2>database connection failed</h2>') ;
			res.end() ;
	}
}) ;

	

app.get('/chanel/create', function(req, res){

}) ;

app.get('/chanel/showpage', function(req, res){


}) ;

app.get('chanel/show', function(req, res)  {

}) ;

app.get('chanel/show/:id', function(req, res){


}) ;

app.post('/chanel/show/:id', function(req, res){


}) ;

app.get('/chanel/show/public', function(req, res) {

}) ;


app.get('/blog/list', function(req, res){

}) ;

app.get('/blog/create', function(req, res){

}) ;

app.post('/blog/create', function(req, res){

}) ;

app.get('/file/upload', function(req, res) {

	var now = new Date() ;

	res.render('./file_view/fileupload',{year: now.getFullYear(), month: now.getMonth()}) ;

}) ;

app.post('/process/fileupload/:year/:month', function(req, res) {
	var form = new formidable.IncomingForm() ;
	form.parse(req, function(err, fields, files) {
		if(err){
			return res.render('/file/upload') ;
			console.err(err.stack) ;
		} else{
			console.log('received fileds:') ;
			console.log(fields) ;
			console.log('received files : ') ;
			console.log(files) ;
			res.redirect('/') ;
		}
	}) ;
}) ;



app.get('/file/download', function(req, res) {

}) ;







var addUser = function(id, password, name, sex, email, callback) {
	console.log('addUser called') ;

	pool.getConnection(function(err, conn) {
		if(err){
			if(conn){
				conn.release() ;
			}
			callback(err, null) ;

			return ;
		}
		console.log('database connection thread Id : ' + conn.threadId) ;

		var data = {id: id, password: password, name: name, sex: sex, email: email} ;

		var exec = conn.query('insert into uservo set ?', data, function(err, result){
			conn.release() ;
			console.log('SQL' + exec.sql) ;
			
			if(err) {
				console.log('error SQL') ;
				console.dir(err) ;

				callback(err, null) ;
				return ;
			}
			callback(null, result) ;
		}) ;
		conn.on('error', function(err) {
			console.log('database connect error') ;
			console.dir(err) ;

			callback(err, null) ;

	}) ;
}) ;
} ;

var authUser = function(id, password, callback){
	console.log('authUser called') ;

	pool.getConnection(function(err, conn){
		if(err){
			if(conn){
				conn.release() ;
			}
			callback(err, null) ;
			return ;
		}
		console.log('database connect thread id : ' + conn.threadId) ;

		var columns = ['id', 'password'] ;
		var tablename = 'uservo' ;

		var exec = conn.query('select ?? from ?? where id = ? and password = ?', [columns, tablename, id, password], function(err, rows) {
			conn.release() ;
			console.log('SQL' + exec.sql) ;

			if(rows.length > 0){
				console.log('id [%s], password [%s] same user found ', id, password) ;
				callback(null, rows) ;
				}else{
					console.log('could not found') ;
					callback(null, null) ;
				}
			}) ;
	}) ;
} ;
