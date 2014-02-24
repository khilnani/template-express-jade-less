#!/usr/bin/env node

// vars ========================

var express = require('express');
var routes = require('./app/routes');
var http = require('http');
var path = require('path');
var less = require('less-middleware');
var hb = require('express3-handlebars');

//var Db = require('mongodb').Db;
//var Connection = require('mongodb').Connection;
//var Server = require('mongodb').Server;
//var BSON = require('mongodb').BSON;
//var ObjectID = require('mongodb').ObjectID;

var app = express();
var config = require('./config/env.json')[app.get('env')];

// setup ========================

app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(less({ src: path.join(__dirname, 'app/public') }));
app.set('views', path.join(__dirname, 'app/views'));
var hbs = hb.create({});  // handlebars 
app.engine('handlebars', hbs.engine); // handlebars 
app.set('view engine', 'handlebars'); // handlebars 
//app.set('view engine', 'jade');  // jade

app.use(express.static(path.join(__dirname, 'app/public')));
app.use('/libs/jade', express.static(__dirname + '/node_modules/jade'));

// configuration =================

app.set('port', config.port);
app.use(express.logger('dev'));

/*
var db = new Db('test', new Server('127.0.0.1', 27017, {auto_reconnect: true}, {w: 1, safe: false}));
db.open(function(err, db){
  console.log('Connected to mongodb ');
  var col = db.collection('test');
  var c = {x: { $gt: 3}};
  col.find(c).toArray( function(e, items) {
    console.log( items );
  } );
});
*/

app.use(express.errorHandler({
  dumpExceptions: config.dumpExceptions,
  showStack: config.showStack
}));

// Routes =================

app.get('/', routes.index);
app.get('/api/locale', routes.locale);

// Start server =================

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
  console.log('ENV: ' + app.get('env'));
});
