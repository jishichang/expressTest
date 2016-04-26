var http = require('http');
var express = require('express');
var app = express();
var hbs = require('hbs');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var fortune = require('./lib/fortune.js');

app.use(cookieParser('js'));
app.use(session({
	//secret: settings.cookieSecret,
	//key: settings.db,
	resave: false,
	saveUninitialized: false
}));

app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	var cluster = require('cluster');
	if (cluster.isWorker) {
		console.log('Worker %d received request', cluster.worker.id);
	}
	next();
});

app.get('/', function(req, res){
	res.render('home');
	req.session.userName = 'Anonymous';
	var colorScheme = req.session.colorScheme || 'dark';
	//res.cookie('monster', 'mon nom');
	//res.cookie('signed_monster', 'nom nom', {signed: true});
	//var monster = req.cookies.monster;
	//var signedMonster = req.signedCookies.signed_monster;
	//console.log(monster);
	//console.log(signedMonster);
});

app.get('/getip', function(req,res){
	res.set('Content-Type','text/plain');
	res.send(req.ip);
});

app.get('/about', function(req, res){
	res.render('about', {
		fortune : fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});
});

app.get('/tours/hood-river', function (req, res) {
	res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function (req, res) {
	res.render('tours/request-group-rate');
});

app.use(function(req, res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

function startServer () {
	http.createServer(app).listen(app.get('port'), function (){
		console.log('Express started in ' + app.get('env') + 'mode on 192.168.2.167:' + app.get('port') + '; press Ctrl-C to terminate');
	});
}

if (require.main == module) {
	startServer();
} else {
	module.exports = startServer;
}
