/**
 * If the this value is undefined, return "[object Undefined]".
 * If the this value is null, return "[object Null]".
 * Let O be ! ToObject(this value).
 * Let isArray be ? IsArray(O).
 * If isArray is true, let builtinTag be "Array".
 * Else if O has a [[ParameterMap]] internal slot, let builtinTag be "Arguments".
 * Else if O has a [[Call]] internal method, let builtinTag be "Function".
 * Else if O has an [[ErrorData]] internal slot, let builtinTag be "Error".
 * Else if O has a [[BooleanData]] internal slot, let builtinTag be "Boolean".
 * Else if O has a [[NumberData]] internal slot, let builtinTag be "Number".
 * Else if O has a [[StringData]] internal slot, let builtinTag be "String".
 * Else if O has a [[DateValue]] internal slot, let builtinTag be "Date".
 * Else if O has a [[RegExpMatcher]] internal slot, let builtinTag be "RegExp".
 * Else, let builtinTag be "Object".
 * Let tag be ? Get(O, @@toStringTag).
 * If Type(tag) is not String, set tag to builtinTag.
 * Return the string-concatenation of "[object ", tag, and "]".
 * @param obj 
 * @returns undefined | null | array | arguments | function | error | boolean | number | string | date | regexp | object
 */
const getClassTag = (obj: any): string => Object
.prototype
.toString
.call(obj)
.replace(/\[object\s(\w+)\]/g, '$1')
.toLowerCase()

/**
 * 
 * @param obj 
 * @param types 
 * undefined | null | array | arguments | function | error | boolean | number | string | date | regexp | object
 */
const is = (obj: any, ...types: string[]): boolean => types.indexOf(getClassTag(obj)) !== -1

export default is
