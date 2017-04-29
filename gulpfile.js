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

// gulp.task('clean.compile', function () {
//     return del(['src/ngx-semantic-ui/dist/src/**/*', 'src/ngx-semantic-ui/dist/src']);
// });

gulp.task('clean', function () {
    return del('src/ngx-semantic-ui/dist/**/*');
});

gulp.task('compile', function () {
    var tsResult = gulp.src(['src/ngx-semantic-ui/*.ts', 'src/ngx-semantic-ui/**/*.ts'])
        .pipe($.sourcemaps.init())
        .pipe($.typescript(config.compilerOptions));

    return merge([
        tsResult.dts.pipe(gulp.dest('src/ngx-semantic-ui/dist')),
        tsResult.js
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('src/ngx-semantic-ui/dist'))
    ]);
});

// gulp.task('copy.compile', function () {
//     return gulp.src('dist/src/**/*')
//         .pipe(gulp.dest('dist'));
// });

gulp.task('copy', function () {
    return gulp.src(['README.md', 'LICENSE'])
        .pipe(gulp.dest('src/ngx-semantic-ui/dist'));
});

gulp.task('copy.package', function () {
    var pkg = require('./src/ngx-semantic-ui/package.json');

    pkg.version = version;
    return $.file('package.json', JSON.stringify(pkg, null, '  '))
        .pipe(gulp.dest('src/ngx-semantic-ui/dist'));
});

gulp.task('lint', function () {
    return gulp.src('src/ngx-semantic-ui/index.ts')
        .pipe($.tslint({
            formatter: 'verbose'
        }))
        .pipe($.tslint.report());
});
