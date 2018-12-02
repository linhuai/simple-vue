const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackCommonConf = require('./webpack.common.conf')

const compiler = Webpack(webpackCommonConf);
const devServerOptions = Object.assign({}, webpackCommonConf.devServer, {
  stats: {
    colors: true
  }
})
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(9000, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8080');
});

