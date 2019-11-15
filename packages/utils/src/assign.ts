const assignObj = (target: any, source: any): object => {
  const keySet = Object.keys({ ...target, ...source })
  keySet.forEach(k => {
    target[k] = source[k] === undefined ? target[k] : source[k]
  })
  return target
}

export default (target: object, ...sources: object[]): object => {
  while (sources.length) {
    const source = sources.shift()
    if (source) {
      target = assignObj(target, source)
    }
  }
  return target
}
