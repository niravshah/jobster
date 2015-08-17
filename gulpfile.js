var gulp = require('gulp');
var artoo = require('gulp-artoo');
var clean = require('gulp-clean');
var runSequence = require('run-sequence'),
    connect = require('gulp-connect');

gulp.task('default', function(cb) {
   runSequence('clean', 'bookmarklet',cb);
});

gulp.task('clean', function() {
    return gulp.src('./build', {
        read: false
    }).pipe(clean());
});

gulp.task('bookmarklet', function() {
  return gulp.src('./bookmarklet/bookmarklet.js')        
    .pipe(artoo())      
    .pipe(gulp.dest('./build'));
});

gulp.task('connect', function() {
    connect.server({
        root: './build',
        port: 7000,
        livereload: false
    });
});



