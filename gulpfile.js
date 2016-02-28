var gulp = require("gulp");
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var batch = require('gulp-batch');
 
gulp.task('templates', function(){
  gulp.src('scripts/*/templates/*.hbs')
    .pipe(handlebars({
        handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Templates',
      noRedeclare: true, // Avoid duplicate declarations 
    }))
    .pipe(concat('precompiled-templates.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('work', function(){
  gulp.start('templates');
    watch('scripts/**', batch(function(events, done){
        gulp.start('templates', done);
    }));
});