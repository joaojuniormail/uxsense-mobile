let gulp = require('gulp');
let concat = require('gulp-concat');
let sass = require('gulp-sass');
let minifyCss = require('gulp-minify-css');
let rename = require('gulp-rename');
let paths = {
  sass: ['./scss/**/*.scss'],
  controller: ['./controller/**/*.js'],
  libs: ['./node_modules/jquery/dist/jquery.min.js', './node_modules/angular-translate/dist/angular-translate.min.js', './node_modules/angular-input-masks/releases/angular-input-masks-standalone.min.js', './node_modules/angular-i18n/angular-locale_pt-br.js']
};

var tasks = {};
tasks.sass = () => {
  return gulp
    .src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'));
}
tasks.controller = () => {
  return gulp
    .src(paths.controller)
    .pipe(concat('./www/js/controllers.js'))
    .pipe(gulp.dest('./'));
}
tasks.lib = () => {
  return gulp
    .src(paths.libs)
    .pipe(concat('./www/js/libs.js'))
    .pipe(gulp.dest('./'));
}
tasks.watchSass = () => {
  return gulp
    .watch(paths.sass, ['sass']);
  Î
}
tasks.watchController = () => {
  return gulp
    .watch(paths.controller, ['controller']);
}

/* ------- GULP TASKS ------- */
gulp.task('sass', tasks.sass);
gulp.task('controller', tasks.controller);
gulp.task('lib', tasks.lib);
gulp.task('default', gulp.series(['sass', 'controller', 'lib']));
gulp.task('watch-sass', tasks.watchSass);
gulp.task('watch-controller', tasks.watchController);
gulp.task('ionic:build:before', gulp.series(['default']));
