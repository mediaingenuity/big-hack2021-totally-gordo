export function sum(obj) {
  return Object.keys(obj).reduce(
    (sum, key) => sum + parseFloat(obj[key] || 0),
    0
  )
}

export function max(obj) {
  const arr: any[] = Object.values(obj)
  return Math.max(...arr)
}
