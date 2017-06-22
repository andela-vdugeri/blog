'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');


gulp.task('nodemon', () => {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {NODE_ENV: 'development'},
    ignore: ['node_modules/']
  }).on('restart', () => {
    console.log('App restarted!');
  });
});

gulp.task('hot-reload', () => {
  browserSync.reload();
});


gulp.task('default', ['nodemon', 'hot-reload']);
