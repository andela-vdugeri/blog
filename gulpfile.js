const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');
const browserSync = require('browser-sync');
const port = process.env.APP_PORT;


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


gulp.task('default', ['nodemon']);
