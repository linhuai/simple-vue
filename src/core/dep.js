let uid = 0
export function Dep () {
  this.subs = []
  this.id = uid++
}

Dep.target = null

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
}

Dep.prototype.notify = function () {
  let subs = this.subs
  subs.forEach(sub => {
    sub.update()
  })
}

/**
 * @param {watcher} 
 */
export function pushTarget (target) {
  Dep.target = target
}

export function popTarget () {
  Dep.target = null
}

