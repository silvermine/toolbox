import { isArguments } from '../utils/is-arguments';
import { isArrayOfStrings } from '../utils/is-array-of-strings';
import { isObject } from '../utils/is-object';
import { isArray } from '../utils/is-array';

/**
 * `StringArrayOfStringsMap`s have `string`s as keys and `string[]` as values. For
 * example:
 *
 * ```
 * const obj: StringArrayOfStringsMap = {
 *    key: [ 'must , 'be', 'strings' ],
 *    arr: [],
 * };
 * ```
 */
export interface StringArrayOfStringsMap { [s: string]: string[] }

/**
 * Type guard for `StringArrayOfStringsMap`.
 *
 * @returns `true` if `o` is a `StringArrayOfStringsMap`
 */
export function isStringArrayOfStringsMap(o: any): o is StringArrayOfStringsMap {
   // Arrays and the array-like `arguments` variable are objects, so they would not be
   // caught by an `isObject` check
   if (!isObject(o) || isArray(o) || isArguments(o)) {
      return false;
   }

   for (const k of Object.keys(o)) {
      if (!isArrayOfStrings((o as any)[k])) {
         return false;
      }
   }

   return true;
}
