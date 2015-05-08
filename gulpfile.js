import { task, watch, src, dest } from 'gulp';
import { log } from 'gulp-util';
import autoprefixer from 'gulp-autoprefixer';
import eslint from 'gulp-eslint';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import del from 'del';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import envify from 'envify/custom';

const paths = {
  out: 'public',
  html: {
    main: './src/index.html'
  },
  js: {
    main: './src/js/index.js',
    glob: './src/js/**/*.js',
    out: 'bundle.js'
  },
  scss: {
    main: './src/scss/index.scss',
    glob: './src/scss/**/*.scss',
    out: 'bundle.css'
  }
};

let env;

try {
  env = require(`./config/${process.env.NODE_ENV}.json`);
} catch (e) {
  env = require('./config/default.json');
}

const autoprefixerConfig = {
  browsers: ['last 2 versions']
};

function html() {
  return src(paths.html.main).pipe(dest(paths.out));
}

function lintJs(cb) {
  src(paths.js.glob)
    .pipe(eslint())
    .pipe(eslint.format())
    .on('error', log);

  return cb();
}

task('lint-js', lintJs);

task('clean', cb => del([paths.out], cb));

task('build-html', ['clean'], html);

task('build-js', ['lint-js', 'clean'], () => {
  return browserify(paths.js.main)
    .transform(babelify)
    .transform(envify(env))
    .bundle()
    .pipe(source(paths.js.out))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(dest(paths.out));
});

task('build-scss', ['clean'], () => {
  return src(paths.scss.main)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer(autoprefixerConfig))
    .pipe(rename(paths.scss.out))
    .pipe(dest(paths.out));
});

task('watch-html', ['clean'], () => {
  watch(paths.html.main, html);

  return html();
});

task('watch-js', ['clean'], () => {
  const b = watchify(browserify({ debug: true, ...watchify.args }));

  function bundle() {
    return lintJs(() => {
      return b.bundle()
        .pipe(source(paths.js.out))
        .pipe(dest(paths.out));
    });
  }

  b.add(paths.js.main)
    .transform(babelify)
    .transform(envify(env))
    .on('update', bundle)
    .on('error', log)
    .on('log', log);

  return bundle();
});

task('watch-scss', ['clean'], () => {
  function bundle() {
    return src(paths.scss.main)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer(autoprefixerConfig))
      .pipe(rename(paths.scss.out))
      .pipe(sourcemaps.write())
      .pipe(dest(paths.out));
  }

  watch(paths.scss.glob, bundle);

  return bundle();
});

task('build', ['build-html', 'build-js', 'build-scss']);
task('watch', ['watch-html', 'watch-js', 'watch-scss']);
