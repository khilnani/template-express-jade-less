var gulp = require('gulp');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var coffee = require('gulp-coffee');
var less = require('gulp-less');
var exec = require('gulp-exec');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha = require('gulp-mocha');
//var handlebars = require('gulp-handlebars');
var concat = require('gulp-concat');
//var map = require('map-stream');
//var debug = require('gulp-debug');
var bump = require('gulp-bump');
var rename = require('gulp-rename');
var glob = require('glob');
var git = require('gulp-git');
var browserify = require('gulp-browserify');
var intercept = require('gulp-intercept');

var path = require("path");
//var fs = require("fs");

//-------------------------------------------------------
/*
var onError = map(function (file, cb) {
  if (!file.jshint.success) {
    console.error('jshint failed: ' + file.path);
    process.exit(1);
  }
});
*/
//-------------------------------------------------------

gulp.task('lint', function () {
  gulp.src([
      './**/*.js',
      '!./node_modules/**',
      '!./bower_components/**',
      '!./public/js/handlebars.js',
      '!./public/js/modules.js',
      '!./public/js/jade.js'
    ])
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
//    .pipe(onError);
});

//-------------------------------------------------------
//
gulp.task('mocha', function () {
  gulp.src('./test/mocha.js')
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('phantomjs', function () {
  gulp.src('.')
    .pipe(exec('phantomjs ./test/phantom.js', {silent: false}));
});

gulp.task('test', ['lint', 'mocha', 'phantomjs'], function () {
});


//-------------------------------------------------------

gulp.task('coffee', function () {
  gulp.src(['./public/js/**/*.coffee'])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('browserify', ['coffee'], function () {
  var dir = __dirname + '/public/js/modules/';
  var requires = glob.sync(dir + '**/*.js').map(function(file) {
    return [file, {expose: path.basename(file, '.js') }];
  });
  gulp.src( dir + 'core.js')
    .pipe(browserify({insertGlobals: false, require: requires}))
    .pipe(rename('modules.js'))
//    .on('prebundle', function (bundler) {
//      var files = fs.readdirSync( dir );
//      for (var i in files) {
//        var name = dir +  files[i];
//        if (fs.statSync(name).isFile() && path.extname(name) === '.js') {
//          var exposeName = path.basename(name, path.extname(path.basename(name)));
//          bundler.require(name, {expose: exposeName});
//        }
//      }
//    })
//    .pipe(concat('modules.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('less', function () {
  gulp.src(['./public/css/*.less'])
    .pipe(less({
      paths: ['./public/css/']
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('jade-templates', function () {
  gulp.src(['./public/templates/*.jade'])
    .pipe(jade({
      client: true
    }))
    .pipe(intercept(function(file){
      var name =  file.path;
      var exposeName = path.basename(name, path.extname(path.basename(name)));
      file.contents = new Buffer( file.contents.toString().replace('function template(', 'function ' + exposeName + '(') );
      return file;
    }))
    .pipe(concat('jade.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('templates', ['jade-templates'], function () {
  gulp.src(['./public/templates/*.handlebars'])
    .pipe(exec('handlebars ./public/templates/*.handlebars -f ./public/js/handlebars.js'));
});

//-------------------------------------------------------

gulp.task('watch', ['templates', 'browserify', 'less'], function () {
  gulp.watch('./public/templates/*.jade', ['templates']);
  gulp.watch('./public/js/**/*.coffee', ['browserify']);
  gulp.watch('./public/css/*.less', ['less']);
});

gulp.task('build', ['templates', 'browserify', 'less'], function () {
});

//-------------------------------------------------------

gulp.task('bump', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('tag', function () {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('./')
    .pipe(git.commit(message))
    .pipe(git.tag(v, message))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));
});

gulp.task('release', ['test', 'build', 'bump', 'tag'], function () {
});

//-------------------------------------------------------

gulp.task('all', ['test', 'build'], function () {
});

gulp.task('ci', ['test', 'build'], function () {
});

gulp.task('default', ['build'], function () {
});

//-------------------------------------------------------

