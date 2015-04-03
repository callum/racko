var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    // preLoaders: [{
    //   test: /\.js$/,
    //   loader: 'eslint-loader',
    //   include: path.join(__dirname, 'src')
    // }],
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?experimental&optional=runtime'],
      include: path.join(__dirname, 'src')
    }]
  }
};
