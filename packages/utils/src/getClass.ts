export default (target: any): string => Object.prototype.toString.call(target).replace(/^\[object (\w+)\]$/, '$1')
