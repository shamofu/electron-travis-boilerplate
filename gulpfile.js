var appDir = 'app';
var compDir = '_comp';
var distDir = '_dist';

var gulp = require('gulp');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var named = require('vinyl-named');
var $ = require('gulp-load-plugins')();
var electron = require('electron-connect').server.create({path: compDir});

var webpackConfig = require('./webpack.config.js');

gulp.task('comp', ['copy2comp'], function() {
  return gulp.src(appDir + '/**/*.{js,jsx}')
    .pipe($.babel())
    .pipe(gulp.dest(compDir));
});

gulp.task('start', ['comp'], function() {
  electron.start();
  gulp.watch(appDir + '/**/*.{js,jsx}', ['comp']);
  gulp.watch([appDir + '/**', '!' + appDir + '/**/*.{js,jsx}'], ['copy2comp']);
  // gulp.watch(compDir + '/main.js', electron.restart);
  gulp.watch([compDir + '/**/*.{html,js,css}', '!' + compDir + '/main.js'], electron.reload);
});

gulp.task('dist', ['copy2dist'], function() {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(distDir));
});

gulp.task('copy2comp', function() {
  gulp.src([appDir + '/**', '!' + appDir + '/**/*.{js,jsx}'], {base: appDir})
    .pipe(gulp.dest(compDir));
});

gulp.task('copy2dist', function() {
  gulp.src([appDir + '/**', '!' + appDir + '/**/*.{js,jsx}'], {base: appDir})
    .pipe($.useref())
    .pipe(gulp.dest(distDir));
});