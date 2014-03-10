#!/usr/bin/env node

// vars ========================

var log = require('dysf.utils').logger;
var express = require('express');
var routes = require('./app/routes');
var http = require('http');
var path = require('path');
var less = require('less-middleware');
var hb = require('express3-handlebars');

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

log.setLogLevel( config.logLevel );
app.set('port', config.port);
app.use(express.logger('dev'));

app.use(express.errorHandler({
  dumpExceptions: config.dumpExceptions,
  showStack: config.showStack
}));

// Routes =================

app.get('/', routes.index);
app.get('/api/locale', routes.locale);

// Start server =================

http.createServer(app).listen(app.get('port'), function () {
  log.system('Express server listening on port ' + app.get('port'));
  log.info('Environment: ' + app.get('env'));
});
