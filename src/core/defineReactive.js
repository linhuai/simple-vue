import { Dep } from './dep.js'
export function defineReactive (obj, key, value) {
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get () {
      if (Dep.target) {
        Dep.target.addDep(dep)
      }
      return value
    },
    set (newVal) {
      dep.notify()
      value = newVal
    }
  })
}