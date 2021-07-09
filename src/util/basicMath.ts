export function sum(arr) {
  return arr.reduce((sum, key) => sum + parseFloat(arr || 0), 0)
}

export function max(arr) {
  return Math.max(...arr)
}

export function percentage(item, obj) {
  const total = sum(Object.keys(obj).map((item) => obj[item]))
  return ((item / total) * 100).toFixed(2)
}
