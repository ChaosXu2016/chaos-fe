import getClass from './getClass'

let weakMap: WeakMap<any, any> | null = null

function cloneDate (date: Date): Date {
  return new Date(date)
}

function cloneMap (map: Map<any, any>): Map<any, any> {
  return new Map(map)
}

function cloneSet (set: Set<any>): Set<any> {
  return new Set(set)
}

function cloneObject (obj: any): any {
  weakMap = weakMap || new WeakMap()
  if (weakMap.get(obj)) {
    return weakMap.get(obj)
  }
  const cobj: any = {}
  weakMap.set(obj, cobj)
  for(let k in obj) {
    cobj[k] = clone(obj[k])
  }
  return obj
}

function cloneArray (arrs: any[]): any[] {
  return arrs.map(item => clone(item))
}

function clone (target: any): any {
  const cls = getClass(target)
  switch (cls) {
    case 'Map':
      return cloneMap(target)
    case 'Object':
      return cloneObject(target)
    case 'Set':
      return cloneSet(target)
    case 'Date':
      return cloneDate(target)
    case 'Array':
      return cloneArray(target)
    default:
      return target
  }
}

function deepClone (target: any): any {
  const res = clone(target)
  weakMap = null
  return res
}

export default deepClone
