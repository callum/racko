var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel?experimental&optional=runtime'],
      include: path.join(__dirname, 'src')
    }]
  }
};
