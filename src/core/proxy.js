/**
 * 
 * @param {vm: component} target 
 * @param {string} sourceKey 
 * @param {string} key 
 */
export function proxy (target, sourceKey, key) {
  Object.defineProperty(target, key, {
    get () {
      return target[sourceKey][key]
    },
    set (newVal) {
      target[sourceKey][key] = newVal
    }
  })
}