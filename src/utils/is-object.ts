/**
 * Type guard for `object`s.
 *
 * Object literals `{}`, instances of `class`es, `function`s, and arrays (both `new
 * Array()` and `[]`) are `object`s.  * However, `null` is not considered an `object`.
 *
 * @see http://www.ecma-international.org/ecma-262/7.0/#sec-object-type
 * @see https://github.com/lodash/lodash/blob/750067f42d3aa5f927604ece2c6df0ff2b2e9d72/isObject.js
 * @see https://github.com/jashkenas/underscore/blob/d5fe0fd4060f13b40608cb9d92eda6d857e8752c/underscore.js#L1322
 * @returns `true` if `o` is an `object`
 */
export function isObject(o: unknown): o is object {
   const type = typeof o;

   return o !== null && (type === 'object' || type === 'function');
}
