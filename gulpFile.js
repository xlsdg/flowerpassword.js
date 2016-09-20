'use strict';

const srcPath = './src';
const dstPath = './dist';

const gulp = require('gulp');
const del = require('del');


const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const together = require('gulp-together');


gulp.task('clean-all', function() {
    return del([dstPath + '/**', '!' + dstPath]);
});

gulp.task('default', ['clean-all'], function() {
    return gulp.src([srcPath + '/*.js'])
        .pipe(sourcemaps.init())
        .pipe(together(['blueimp-md5']))
        .pipe(gulp.dest(dstPath + '/'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(sourcemaps.write('.', {
            addComment: false
        }))
        .pipe(gulp.dest(dstPath + '/'));
});

gulp.task('watch', function() {
    return gulp.watch([srcPath + '/**/*.js'], ['default']).on('change', function(event) {
        console.log('Type: ' + event.type);
        console.log('Path: ' + event.path);
    });
});
