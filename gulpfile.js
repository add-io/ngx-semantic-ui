'use strict';

var gulp = require('gulp');
var config = require('./tsconfig.json');
var del = require('del');
var merge = require('merge2');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

var version = process.env.npm_package_version;

gulp.task('build', function (cb) {
    runSequence('clean', 'lint', 'compile', ['copy', 'copy.package'], cb);
});

gulp.task('clean', function () {
    return del('dist/**/*');
});

gulp.task('compile', function () {
    var tsResult = gulp.src(['src/*.ts', 'src/**/*.ts'])
        .pipe($.sourcemaps.init())
        .pipe($.typescript(config.compilerOptions));

    return merge([
        tsResult.dts.pipe(gulp.dest('dist')),
        tsResult.js
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('dist'))
    ]);
});

gulp.task('copy', function () {
    return gulp.src(['README.md', 'LICENSE'])
        .pipe(gulp.dest('dist'));
});

gulp.task('copy.package', function () {
    var pkg = require('./package.json');

    pkg.version = version;
    return $.file('package.json', JSON.stringify(pkg, null, '  '))
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function () {
    return gulp.src('src/index.ts')
        .pipe($.tslint({
            formatter: 'verbose'
        }))
        .pipe($.tslint.report());
});
