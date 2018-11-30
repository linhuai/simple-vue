/**
 * 
 * @param {vm: component} target 
 * @param {string} sourceKey 
 * @param {string} key 
 */
export function proxy (target, sourceKey, key) {
  target[key] = target[sourceKey][key]
}