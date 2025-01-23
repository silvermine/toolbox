import { isArrayOfStrings } from '../utils/is-array-of-strings';
import { isStringUnknownMap } from './StringUnknownMap';

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
export function isStringArrayOfStringsMap(o: unknown): o is StringArrayOfStringsMap {
   // Arrays and the array-like `arguments` variable are objects, so they would not be
   // caught by an `isObject` check
   if (!isStringUnknownMap(o)) {
      return false;
   }

   for (const k of Object.keys(o)) {
      if (!isArrayOfStrings(o[k])) {
         return false;
      }
   }

   return true;
}
