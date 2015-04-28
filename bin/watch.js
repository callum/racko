import fs from 'fs';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import envify from 'envify/custom';

const w = watchify(browserify('./src/js/index.js', { debug: true }));

function bundle() {
  w.bundle().pipe(fs.createWriteStream('build/bundle.js'));
}

w.transform(babelify);
w.transform(envify(require(`./${process.env.NODE_ENV || 'default'}.json`)));
w.on('update', bundle);
bundle();
