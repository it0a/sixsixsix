/*global console, require*/
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var remember = require('gulp-remember');
var cache = require('gulp-cached');
var del = require('del');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

var dist = 'dist';

var paths = {
  stylesheets: [
    'src/**/*.css',
  ],
  scripts: [
    'src/**/*.js',
  ],
  markup: [
    'src/**/*.html',
  ]
};

gulp.task('clean', function (cb) {
  del(['build'], cb);
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts'])
  .on('error', handleError);
  gulp.watch(paths.stylesheets, ['stylesheets'])
  .on('error', handleError);
  gulp.watch(paths.markup, ['markup'])
  .on('error', handleError);
});

gulp.task('stylesheets', ['clean'], function () {
  return gulp.src(paths.stylesheets)
  .on('error', handleError)
  .pipe(concat('app.css'))
  .on('error', handleError)
  .pipe(gulp.dest(dist))
  .on('error', handleError);
});

gulp.task('markup', ['clean'], function () {
  return gulp.src(paths.markup)
  .on('error', handleError)
  .pipe(gulp.dest(dist))
  .on('error', handleError);
});

gulp.task('scripts', ['clean'], function () {
  return gulp.src(paths.scripts)
  .pipe(cache('scripts'))
  .on('error', handleError)
  .pipe(babel())
  .on('error', handleError)
  .pipe(uglify())
  .on('error', handleError)
  .pipe(remember('scripts'))
  .on('error', handleError)
  .pipe(concat('app.js'))
  .on('error', handleError)
  .pipe(gulp.dest(dist))
  .on('error', handleError);
});

gulp.task('default', ['watch', 'scripts', 'markup', 'stylesheets']);
