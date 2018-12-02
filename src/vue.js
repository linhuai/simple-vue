import { Watcher } from './core/index'
import { proxy } from './core/proxy'
import { defineReactive } from './core/defineReactive'
function Vue (options = {}) {
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
      proxy(vm, '_data', key)                                // 把 data 数据代理到 Vue 实例上
      defineReactive(data, key, data[key])
    }
  })
}

/**
 * 初始化 计算属性
 * @param {*} vm 
 * @param {Object} computed
 */
function initComputed (vm, computed) {
  let watchers = vm._computedWatchers = Object.create(null)   // 创建一个空对象用于存放 watcher
  for (let key in computed) {
    watchers[key] = new Watcher(vm, computed[key])
    Object.defineProperty(vm, key, {
      get: function () {
        console.log(`获取 computed[${key} => ${watchers[key].value}`)
        const watcher = watchers[key]
        return watcher.value
      },
      set () {
        console.log('warn: computed do not change')
      }
    })
  }
}

function initProps (vm, props) {

}

export default Vue