(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vue = factory());
}(this, (function () { 'use strict';

  let uid = 0;
  function Dep () {
    this.subs = [];
    this.id = uid++;
  }

  Dep.target = null;

  Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
  };

  Dep.prototype.notify = function () {
    let subs = this.subs;
    subs.forEach(sub => {
      sub.update();
    });
  };

  /**
   * @param {watcher} 
   */
  function pushTarget (target) {
    Dep.target = target;
  }

  function popTarget () {
    Dep.target = null;
  }

  function defineReactive (obj, key, value) {
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      get () {
        console.log(`获取 data[${key}] => ${value}`);
        if (Dep.target) {
          console.log(Dep.target);
          Dep.target.addDep(dep);
        }
        return value
      },
      set (newVal) {
        console.log(`设置 data [${key}], newVal => ${newVal}, oldVal => ${value}`);
        value = newVal;
        dep.notify();
      }
    });
  }

  function Watcher (vm, expOrFn) {
    this.getter = expOrFn;
    this.vm = vm;
    this.value = this.get();
  }

  Watcher.prototype.get = function () {
    pushTarget(this);
    let value = this.getter.call(this.vm);
    popTarget();
    return value
  };

  Watcher.prototype.addDep = function (dep) {
    dep.addSub(this);
  };

  Watcher.prototype.update = function () {
    console.log(`watcher update`);
    console.log(this.getter);
    let value = this.getter.call(this.vm);
    this.value = value;
  };

  /**
   * 
   * @param {vm: component} target 
   * @param {string} sourceKey 
   * @param {string} key 
   */
  function proxy (target, sourceKey, key) {
    Object.defineProperty(target, key, {
      get () {
        return target[sourceKey][key]
      },
      set (newVal) {
        target[sourceKey][key] = newVal;
      }
    });
  }

  function Vue (options = {}) {
    this.$options = options;
    this._init();
  }

  Vue.prototype._init = function () {
    let vm = this;
    let { data, computed, watch, props } = this.$options;

    if (data) initData(vm, data);
    if (computed) initComputed(vm, computed);
    if (watch) initWatch(vm, watch);
  };

  function initData (vm, data) {
    data = vm._data = typeof data === 'function' ? data() : data;
    Object.keys(data).forEach(key => {
      if (data[key] instanceof Object) {
        console.log(`data[${key}] is Object`);
      } else if (data[key] instanceof Array) {
        console.log(`data[${key}] is Array`);
      } else {
        proxy(vm, '_data', key);                                // 把 data 数据代理到 Vue 实例上
        defineReactive(data, key, data[key]);
      }
    });
  }

  /**
   * 初始化 计算属性
   * @param {*} vm 
   * @param {Object} computed
   */
  function initComputed (vm, computed) {
    let watchers = vm._computedWatchers = Object.create(null);   // 创建一个空对象用于存放 watcher
    for (let key in computed) {
      watchers[key] = new Watcher(vm, computed[key]);
      Object.defineProperty(vm, key, {
        get: function () {
          console.log(`获取 computed[${key} => ${watchers[key].value}`);
          const watcher = watchers[key];
          return watcher.value
        },
        set () {
          console.log('warn: computed do not change');
        }
      });
    }
  }

  return Vue;

})));
