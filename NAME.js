#!/usr/bin/env node

var express = require('express');
var routes = require('./app/routes');
var http = require('http');
var path = require('path');
var less = require('less-middleware');
var hb = require('express3-handlebars');

var app = express();
var config = require('./config/env.json')[app.get('env')];

// all environments
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(less({ src: path.join(__dirname, 'public') }));
app.set('views', path.join(__dirname, 'app/views'));
// UN/COMMENT if using jade views
// app.set('view engine', 'jade');
// END
// UN/COMMENT if using handlebars views
var hbs = hb.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//END
app.use(express.static(path.join(__dirname, 'public')));
app.use('/libs', express.static(__dirname + '/bower_components'));
app.use('/libs/jade', express.static(__dirname + '/node_modules/jade'));


app.set('port', config.port);
app.use(express.logger('dev'));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}

// production only
if ('production' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
  console.log('ENV: ' + app.get('env'));
});
