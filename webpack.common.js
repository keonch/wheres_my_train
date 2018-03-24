const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production'
    })
  ],
  node: {
   console: true,
   fs: 'empty',
   net: 'empty',
   tls: 'empty'
 },
  output: {
    filename: '.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
