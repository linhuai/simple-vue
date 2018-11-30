import { defineReactive, watcher, Watcher } from './core/index'
import { proxy } from './core/proxy';

export default function Vue (options = {}) {
  this.$options = options
  this._init()
}

Vue.prototype._init = function () {
  let vm = this
  let { data, computed, watch, props } = this.$options

  if (data) initData(vm, data)
  if (computed) initComputed(vm, computed)
  if (watch) initWatch(vm, watch)
  if (props) initProps(vm, props)
}

function initData (vm, data) {
  data = vm._data = typeof data === 'function' ? data() : data
  Object.keys(data).forEach(key => {
    if (data[key] instanceof Object) {
      console.log(`data[${key}] is Object`)
    } else if (data[key] instanceof Array) {
      console.log(`data[${key}] is Array`)
    } else {
      defineReactive(data, key, data[key])
      proxy(vm, '_data',key)
    }
  })
}

/**
 * 初始化 计算属性
 * @param {*} vm 
 * @param {Object} computed
 */
function initComputed (vm, computed) {
  let watchers = vm._computedWatchers = Object.create(null)
  for (let key in computed) {
    watchers[key] = new Watcher(vm, computed[key])
    Object.defineProperty(vm, key, {
      get: computed[key],
      set () {
        console.log('warn: computed do not change')
      }
    })
  }
}

function initProps (vm, props) {

}
