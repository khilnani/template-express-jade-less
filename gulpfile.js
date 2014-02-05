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
//var concat = require('gulp-concat');
//var declare = require('gulp-declare');
var rename = require('gulp-rename');
var map = require('map-stream');
//var debug = require('gulp-debug');
var bump = require('gulp-bump');
var git = require('gulp-git');

//-------------------------------------------------------

var onError = map(function (file, cb) {
  if (!file.jshint.success) {
    console.error('jshint failed');
    process.exit(1);
  }
});

//-------------------------------------------------------

gulp.task('lint', function () {
  gulp.src(['./**/*.js', '!./node_modules/**', '!./bower_components/**', '!./public/js/templates.js'])
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

gulp.task('phantomjs', function (cb) {
  gulp.src('.')
    .pipe(exec('phantomjs ./test/phantom.js', {silent: false}));
  cb();
});

gulp.task('test', ['lint', 'mocha', 'phantomjs'], function () {
});


//-------------------------------------------------------

gulp.task('jade', function () {
  gulp.src(['./views/templates/*.jade'])
    .pipe(jade())
//    .pipe(debug({verbose: true}))
    .pipe(rename(function (dir, base, ext) {
      return base + '.handlebars';
    }))
//    .pipe(debug({verbose: true}))
    .pipe(gulp.dest('./views/templates'));
});

gulp.task('coffee', function () {
  gulp.src(['./public/js/*.coffee'])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('less', function () {
  gulp.src(['./public/css/*.less'])
    .pipe(less({
      paths: ['./public/css/']
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('templates', ['jade'], function () {
  gulp.src(['./views/templates/*.handlebars'])
    .pipe(exec('handlebars ./views/templates/*.handlebars -f ./public/js/templates.js'));
});

//-------------------------------------------------------

gulp.task('watch', ['templates', 'coffee', 'less'], function () {
  gulp.watch('./views/templates/*.jade', ['templates']);
  gulp.watch('./public/js/*.coffee', ['coffee']);
  gulp.watch('./public/css/*.less', ['less']);
});

gulp.task('build', ['templates', 'coffee', 'less'], function () {
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

