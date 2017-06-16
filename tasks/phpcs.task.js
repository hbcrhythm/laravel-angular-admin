var gulp = require('gulp')
var phpcs = require('gulp-phpcs')
var Elixir = require('laravel-elixir')
var Task = Elixir.Task

new Task('phpcs', function () {
  return gulp.src(['app/**/**/*.php'])
    .pipe(phpcs({
      bin: 'vendor/bin/phpcs',
      standard: 'PSR2',
      warningSeverity: 0
    }))
    .on('error', errorHandler)
    .pipe(phpcs.reporter('log'))
})

new Task('phpcs:config', function () {
  return gulp.src(['config/*.php'])
    .pipe(phpcs({
      bin: 'vendor/bin/phpcs',
      standard: 'PSR2',
      warningSeverity: 0
    }))
    .on('error', errorHandler)
    .pipe(phpcs.reporter('log'))
})

function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}