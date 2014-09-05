var gulp = require('gulp');
var wrap = require('gulp-wrap-umd');
var jshint = require('gulp-jshint');

gulp.task('wrap', function () {
  var wrapOptions = {
    namespace: 'jQuery',
    deps: [
      {
        name: 'jquery-resetbubble',
        globalName: 'jQuery',
        paramName: 'jQuery'
      }
    ]
  };
  gulp
    .src(['src/*.js'])
    .pipe(wrap(wrapOptions))
    .pipe(gulp.dest('dist/'));
});

gulp.task('jshint', function () {
  return gulp
    .src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['jshint', 'wrap']);
