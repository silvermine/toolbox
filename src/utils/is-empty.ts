import { isArray } from './is-array';
import { isString } from './is-string';
import { isArguments } from './is-arguments';
import { isUndefined } from './is-undefined';

/**
 * Checks if `o` is an empty object. An object is "empty" if it:
 *
 *    * Is an `arguments` object, array, or `string`, and has a `length` of `0`
 *    * Is an `object` with no enumerable keys in its prototype
 *    * Is `null`, `undefined`, `boolean`, or a `number`
 *
 * @returns `true` if `o` is empty
 */
export function isEmpty(o: any): boolean {
   if (o === null || isUndefined(o)) {
      return true;
   }
   if (isArray(o) || isString(o) || isArguments(o)) {
      return o.length === 0;
   }
   return Object.keys(o).length === 0;
}
