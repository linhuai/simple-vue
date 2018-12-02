const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackCommonConfig = {
  mode: 'production',
  context: path.resolve(__dirname, '../'),
  entry: {
    vue: './src/test.js',
    main: './js/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  devServer: {},
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../', 'index.html')
    })
  ]
}

module.exports = webpackCommonConfig
