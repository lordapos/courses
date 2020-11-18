/* eslint-disable node/no-unpublished-require */
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const imagemin = require('gulp-imagemin');
const livereload = require('gulp-livereload');
const del = require('del');


gulp.task('scss', () => {
  return gulp
    .src('assets/scss/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest('public/css'))
    .pipe(livereload());
});

gulp.task('img-compress', () => {
  return gulp
    .src('assets/img/**')
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest('public/images'));
});

gulp.task('start', function () {
    nodemon({
        script: 'app.js',
        ext: 'njk scss js'
    })
})

gulp.task('scripts', () =>
  gulp
    .src([
      'assets/js/index.js'
    ])
    .pipe(concat('index.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'))
);

gulp.task('watch', function() {
    livereload.listen();
    nodemon({
        script: 'app.js',
        ext: 'njk scss js'
    });
    gulp.watch('assets/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('assets/js/**/*.js', gulp.series('scripts'));
    gulp.watch('assets/img/**', gulp.series('img-compress'));
});

gulp.task('default', gulp.parallel('img-compress', 'scss', 'scripts'), () => {

});