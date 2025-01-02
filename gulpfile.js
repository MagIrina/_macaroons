'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const concatCss = require('gulp-concat-css');



gulp.task('less', function () {
    return gulp.src('./src/styles/*.less')
        .pipe(less())
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('./dist'))
})

gulp.task('default', gulp.parallel('less'));