const path = require('path');

module.exports = {
  entry: './src/js/init-react.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'init-react.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map'
};