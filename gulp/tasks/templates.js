var gulp        = require('gulp'),
    config      = require('../config').templates,
    handlebars  = require('gulp-handlebars'),
    wrap        = require('gulp-wrap'),
    declare     = require('gulp-declare'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync').create();

gulp.task('templates', function(){
    return gulp.src(config.src)
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
          namespace: 'Portfolio.templates',
          noRedeclare: true, // Avoid duplicate declarations 
        }))
        .pipe(concat(config.fileName))
        .pipe(gulp.dest(config.dest))
});