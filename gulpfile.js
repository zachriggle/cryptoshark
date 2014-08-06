var gulp = require('gulp');
var gutil = require('gulp-util');

var $ = require('gulp-load-plugins')();

gulp.task('build', function () {
  var production = gutil.env.type === 'production';

  gulp.src(['agent/main.js'], {read: false})
    .pipe($.browserify({debug: !production}))
    .pipe($.rename('agent.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('lint', function () {
    return gulp.src([
            'agent/**/*.js'
        ])
        .pipe($.jshint({}))
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function () {
    gulp.watch('agent/**/*.js', ['build']);
    gulp.watch('agent/**/*.js', ['lint']);
});

gulp.task('default', ['build']);
