import { isArray } from './is-array';
import { isString } from './is-string';
import { isArguments } from './is-arguments';
import { isUndefined } from './is-undefined';
import { isSet } from './is-set';

/**
 * Checks if `o` is an empty object. An object is "empty" if it:
 *
 *    * Is an `arguments` object, array, or `string`, and has a `length` of `0`
 *    * Is an `object` with no enumerable keys in its prototype
 *    * Is `null`, `undefined`, `boolean`, or a `number`
 *
 * @returns `true` if `o` is empty
 */
export function isEmpty(o: unknown): boolean {
   if (o === null || isUndefined(o)) {
      return true;
   }
   if (isArray(o) || isString(o) || isArguments(o)) {
      return o.length === 0;
   }
   if (isSet(o)) {
      return o.size === 0;
   }
   // Non-object arguments passed into Object.keys are coerced into objects (the only
   // exception being undefined or null, which is handled above). Therefore, it's ok to
   // assume the input is an object because it will be once passed through. See also:
   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#using_object.keys_on_primitives
   return Object.keys(o as object).length === 0;
}
