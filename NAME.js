#!/usr/bin/env node

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var less = require('less-middleware');
var hb = require('express3-handlebars');
var app = express();

// all environments
app.set('port', process.env.PORT || 8080);

app.use(less({ src: path.join(__dirname, 'public') }));

app.set('views', path.join(__dirname, 'views'));

// UN/COMMENT if using jade views
// app.set('view engine', 'jade');
// END

// UN/COMMENT if using handlebars views
var hbs = hb.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//END

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/libs', express.static(__dirname + '/bower_components'));
app.use('/libs/jade', express.static(__dirname + '/node_modules/jade'));
app.use('/docs', express.static(__dirname + '/docs'));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}

// production
if ('production' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
  console.log('ENV: ' + app.get('env'));
});
