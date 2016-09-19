'use strict';

const srcJs = './src';
const dstJs = './dist';
const md5Js = './node_modules/blueimp-md5/js/md5.js';

const gulp = require('gulp');
const del = require('del');


const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');


gulp.task('clean-js', function() {
    return del([dstJs + '/**/*.*'], {
        dryRun: true
    });
});

gulp.task('build-js', ['clean-js'], function() {
    return gulp.src([md5Js, srcJs + '/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('flowerpassword.js'))
        .pipe(gulp.dest(dstJs + '/'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(sourcemaps.write('.', {
            addComment: false
        }))
        .pipe(gulp.dest(dstJs + '/'));
});

gulp.task('default', ['build-js'], function() {});

gulp.task('watch', function() {
    return gulp.watch([srcJs + '/**/*.js'], ['build-js']).on('change', function(event) {
        console.log('Type: ' + event.type);
        console.log('Path: ' + event.path);
    });
});
