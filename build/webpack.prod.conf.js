const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const path = require('path')

const webpackCommonConf = require('./webpack.common.conf')

const compiler = webpack(webpackCommonConf)

compiler.run((err, stats) => {
  if (err || stats.hasErr) {
    console.log(err)
    return 
  }
  console.log(stats.toString({
    colors: true
  }))
})
