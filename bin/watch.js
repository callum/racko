import fs from 'fs';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import envify from 'envify/custom';

const env = process.env.NODE_ENV || 'default';
const b = browserify(watchify.args);
const w = watchify(b);

function bundle() {
  w.bundle().pipe(fs.createWriteStream('build/bundle.js'));
}

w.add('./src/js/index.js');
w.transform(babelify);
w.transform(envify(require(`../config/${env}.json`)));
w.on('update', bundle);
w.on('log', (msg) => console.log(msg));
bundle();
