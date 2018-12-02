import { Dep } from './dep.js'

export function defineReactive (obj, key, value) {
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get () {
      console.log(`获取 data[${key}] => ${value}`)
      if (Dep.target) {
        console.log(Dep.target)
        Dep.target.addDep(dep)
      }
      return value
    },
    set (newVal) {
      console.log(`设置 data [${key}], newVal => ${newVal}, oldVal => ${value}`)
      value = newVal
      dep.notify()
    }
  })
}