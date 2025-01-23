/**
 * Return `Object`'s `toString` representation of the given parameter. (e.g. "[object
 * Number]").
 *
 * Using `Object`'s `toString` method is different from calling `toString` directly on a
 * value. For example:
 *
 * ```
 * let n: Number = new Number(3.14);
 *
 * n.toString(); // "3.14"
 * Object.prototype.toString.call(n); // "[object Number]"
 * ```
 * Using `Object`'s `toString` function returns a value that lets us determine the
 * object's type when `typeof` is not sufficient. For example:
 *
 * ```
 * let n: number = 1,
 *     nObj: Number = new Number(1);
 *
 * typeof n; // "number"
 * typeof nObj; // "object"
 *
 * // Even though `nObj` is technically an `object`, for all practical purposes we can
 * // treat it as a `number`
 *
 * Object.prototype.toString.call(n); // "[object Number]"
 * Object.prototype.toString.call(nObj); // "[object Number]"
 * ```
 *
 * @private
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#Using_toString()_to_detect_object_class
 * @see https://github.com/jashkenas/underscore/blob/d5fe0fd4060f13b40608cb9d92eda6d857e8752c/underscore.js#L1326
 * @see https://github.com/lodash/lodash/blob/750067f42d3aa5f927604ece2c6df0ff2b2e9d72/isNumber.js#L31
 */
export function getTagString(o: unknown): string {
   return Object.prototype.toString.call(o);
}
