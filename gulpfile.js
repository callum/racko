import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import del from 'del';
import browserify from 'browserify';
import babelify from 'babelify';
import envify from 'envify/custom';

let config;

try {
  config = require(`./config/${process.env.NODE_ENV}.json`);
} catch (e) {
  config = require('./config/default.json');
}

gulp.task('clean', cb => {
  del(['public'], cb);
});

gulp.task('build-html', ['clean'], () => {
  return gulp.src('./src/index.html').pipe(gulp.dest('public'));
});

gulp.task('build-js', ['clean'], () => {
  return browserify('./src/js/index.js')
    .transform(babelify)
    .transform(envify(config))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});

gulp.task('build-scss', ['clean'], () => {
  return gulp.src('./src/scss/index.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['build-html', 'build-js', 'build-scss']);
