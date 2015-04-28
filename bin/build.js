import fs from 'fs';
import browserify from 'browserify';
import babelify from 'babelify';
import envify from 'envify/custom';

browserify('./src/js/index.js')
.transform(babelify)
.transform(envify(require(`./${process.env.NODE_ENV || 'default'}.json`)))
.bundle()
.pipe(fs.createWriteStream('build/bundle.js'));
