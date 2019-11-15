import deepClone from './deepClone'

const assignObj = (target: any, source: any): object => {
  for (let k in source) {
    target[k] = deepClone(source[k])
  }
  return target
}

export default (target: object, ...sources: object[]): object => {
  let res = deepClone(target)
  while (sources.length) {
    const source = sources.shift()
    if (source) {
      res = assignObj(res, source)
    }
  }
  return res
}
