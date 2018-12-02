import { pushTarget, popTarget } from './dep'
export function Watcher (vm, expOrFn) {
  this.getter = expOrFn
  this.vm = vm
  this.value = this.get()
}

Watcher.prototype.get = function () {
  pushTarget(this)
  let value = this.getter.call(this.vm)
  popTarget()
  return value
}

Watcher.prototype.addDep = function (dep) {
  dep.addSub(this)
}

Watcher.prototype.update = function () {
  console.log(`watcher update`)
  console.log(this.getter)
  let value = this.getter.call(this.vm)
  this.value = value
}
