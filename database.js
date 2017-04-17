var http = require('http') ;
var express = require('express') ;
var bodyParser = require('body-parser') ;
var fs = require('fs') ;
var ejs = require('ejs') ;

var mysql = require('mysql') ;
var client = mysql.createConnection({
	user: 'root', 
	password: 'won1228',
	database: 'company'
}) ;

var app = express() ;

app.use(bodyParser.urlencoded({
	extended: false
})) ;

app.listen(52273, function() {
	console.log('server running at http://localhost:52273') ;
}) ;

app.get('/', function(requrest, response){

	fs.readFile('list.html', 'utf8', function(error, data) {
		client.query('select * from products', function(err, results) {
			response.send(ejs.render(data, {
				data: results
			})) ;
		}) ;
	}) ;

}) ;

app.get('/delete/:id', function(request, response) {

client.query('delete from products where id = ?', [request.params.id], function() {
	response.redirect('/') ;

}) ;

}) ;

app.get('/insert', function(request, response){

	fs.readFile('insert.html', 'utf8', function(error, data) {
		response.send(data) ;
	}) ;

}) ;

app.post('/insert', function(request, response) {

	var body = request.body ;

	client.query('insert into products (name, modelnumber, series) values (?, ?, ?)', [body.name, body.modelnumber, body.series], function() {
		response.redirect('/') ;
	}) ;

}) ;

app.get('/edit/:id', function(request, response) {

	fs.readFile('edit.html', 'utf8', function(error, data) {
		client.query('select * from products where id = ?', [request.params.id], function(error, result) {
			response.send(ejs.render(data, {
				data: result[0]
			})) ;
		}) ;
	}) ;

}) ;

app.post('/edit/:id', function(request, response) {

	var body = request.body ;
	client.query('update products set name = ?, modelnumber = ?, series = ? where id = ?', [body.name, body.modelnumber, body.series, request.params.id], function() {
		response.redirect('/') ;
	}) ;

}) ;
