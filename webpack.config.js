var path = require('path');
var webpack = require('webpack');

var config = {
  FIREBASE: JSON.stringify('https://dazzling-heat-6913.firebaseio.com/')
};

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/js/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.DefinePlugin(config),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: path.join(__dirname, 'src/js')
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src/js')
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'csslint', 'autoprefixer', 'sass'],
        include: path.join(__dirname, 'src/scss')
      }
    ]
  }
};
