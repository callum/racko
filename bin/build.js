import fs from 'fs';
import browserify from 'browserify';
import babelify from 'babelify';
import envify from 'envify/custom';
import uglifyify from 'uglifyify';

const env = process.env.NODE_ENV || 'default';

browserify()
.add('./src/js/index.js')
.transform(babelify)
.transform(envify(require(`../config/${env}.json`)))
.transform({ global: true }, uglifyify)
.bundle()
.pipe(fs.createWriteStream('build/bundle.js'));
