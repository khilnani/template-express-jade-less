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
//var declare = require('gulp-declare');
var rename = require('gulp-rename');
var map = require('map-stream');
//var debug = require('gulp-debug');
var bump = require('gulp-bump');
var git = require('gulp-git');
var browserify = require('gulp-browserify');

//-------------------------------------------------------

var onError = map(function (file, cb) {
  if (!file.jshint.success) {
    console.error('jshint failed');
    process.exit(1);
  }
});

//-------------------------------------------------------

gulp.task('lint', function () {
  gulp.src(['./**/*.js', '!./node_modules/**', '!./bower_components/**', '!./public/js/templates.js', '!./public/js/modules.js'])
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(onError);
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

gulp.task('jade-templates', function () {
  gulp.src(['./public/templates/*.jade'])
    .pipe(jade())
    .pipe(rename(function (dir, base, ext) {
      return base + '.handlebars';
    }))
    .pipe(gulp.dest('./public/templates'));
});

gulp.task('coffee', function () {
  gulp.src(['./public/js/**/*.coffee'])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('browserify', ['coffee'], function () {
  gulp.src(['./public/js/modules/**/*.js'])
    .pipe(browserify({insertGlobals: false}))
    .on('prebundle', function (bundler) {
      bundler.require(__dirname + '/public/js/modules/core.js', {expose: 'core'});
      bundler.require(__dirname + '/public/js/modules/util.js', {expose: 'util'});
    })
    .pipe(concat('modules.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('less', function () {
  gulp.src(['./public/css/*.less'])
    .pipe(less({
      paths: ['./public/css/']
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('templates', ['jade-templates'], function () {
  gulp.src(['./public/templates/*.handlebars'])
    .pipe(exec('handlebars ./public/templates/*.handlebars -f ./public/js/templates.js'));
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

