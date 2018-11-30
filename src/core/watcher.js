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
