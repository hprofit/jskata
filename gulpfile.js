'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin');

var PROJ_ROOT = '',
    LESS_ROOT = PROJ_ROOT + 'less/',
    SCRIPTS_ROOT = PROJ_ROOT + 'src/',
    DIST_ROOT = PROJ_ROOT + 'dist/',
    PROJ_NAME = "jskata";

var styles = [
        LESS_ROOT + '**/*.less'
    ],
    scripts = [
        SCRIPTS_ROOT + '*.js'
    ],
    css = [
        DIST_ROOT + 'css/expanded/core.css'
    ];

gulp.task('styles', function () {
    return gulp.src(styles)
        .pipe(less({style: 'expanded'}))
        .pipe(gulp.dest(DIST_ROOT + '/css/expanded'));
});

gulp.task('cssmin', ['styles'], function () {
    gulp.src(css)
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(concat(PROJ_NAME+'.min.css'))
        .pipe(gulp.dest(DIST_ROOT + '/css'));
});

// Lint Task
gulp.task('lint', function () {
    return gulp.src(scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS -- APP
gulp.task('appscripts', ['lint'], function () {
    return gulp.src(scripts)
        .pipe(concat(PROJ_NAME+'.js'))
        .pipe(gulp.dest(DIST_ROOT))
        .pipe(rename(PROJ_NAME+'.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_ROOT));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(scripts, ['appscripts']);
    gulp.watch(styles, ['styles', 'cssmin']);
});

// Default Task
gulp.task('default', ['appscripts', 'styles', 'cssmin']);
