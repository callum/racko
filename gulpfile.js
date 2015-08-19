import gulp from 'gulp';
import { log } from 'gulp-util';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import del from 'del';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import cssModulesify from 'css-modulesify';
import envify from 'envify/custom';

let env;

try {
  env = require(`./config/${process.env.NODE_ENV}.json`);
} catch (e) {
  env = require('./config/default.json');
}

const cssModulesifyConfig = {
  rootDir: './src/js/',
  output: 'public/bundle.css'
};

function html() {
  return gulp.src('./src/index.html').pipe(gulp.dest('public'));
}

gulp.task('clean', cb => del(['public'], cb));

gulp.task('build-html', ['clean'], html);

gulp.task('build-js', ['clean'], () => {
  return browserify('./src/js/index.js')
    .plugin(cssModulesify, cssModulesifyConfig)
    .transform(babelify)
    .transform(envify(env))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});

gulp.task('watch-html', ['clean'], () => {
  gulp.watch('./src/index.html', html);

  return html();
});

gulp.task('watch-js', ['clean'], () => {
  const args = Object.assign({ debug: true }, watchify.args);
  const b = watchify(browserify(args));

  function bundle() {
    return b.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public'));
  }

  b.add('./src/js/index.js')
    .plugin(cssModulesify, cssModulesifyConfig)
    .transform(babelify)
    .transform(envify(env))
    .on('update', bundle)
    .on('log', msg => log(msg));

  return bundle();
});

gulp.task('build', ['build-html', 'build-js']);
gulp.task('watch', ['watch-html', 'watch-js']);
