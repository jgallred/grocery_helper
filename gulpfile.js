/**
 * Created by Jason on 2/28/14.
 */

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    path = require('path'),
    changed = require('gulp-changed'),
    watch = require('gulp-watch'),
    exec = require('gulp-exec');

gulp.task('composer_install', function() {
    gulp.src('./').pipe(exec('composer install --dev'));
});

gulp.task('bower_install', function() {
    gulp.src('./').pipe(exec('bower install'));
});

gulp.task('install', ['composer_install', 'bower_install']);

gulp.task('lint', function() {
    gulp.src([
        'gulpfile.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['lint']);

gulp.task('watch', function () {
    var server = livereload();
    gulp.watch([
            'app/views/index.php',
            'public/js/**/*.js',
            'public/js/**/*.html'
        ]).on('change', function(file) {
            server.changed(file.path);
        }
    );
});
