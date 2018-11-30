const path = require('path')
export default {
  input: path.resolve(__dirname, '../src/vue.js'),
  output: {
    file: path.resolve(__dirname, '../dist/vue.js'),
    name: 'Vue',
    format: 'umd'
  }
}