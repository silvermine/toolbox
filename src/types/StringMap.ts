import { isString } from '../utils/is-string';
import { isStringUnknownMap } from './StringUnknownMap';

/**
 * `StringMap`s have `string`s as keys and `string`s as values. For example:
 *
 * ```
 * const obj: StringMap = {
 *    key: 'must-be-a-string',
 * };
 * ```
 */
export interface StringMap { [s: string]: string }

/**
 * Type guard for `StringMap`.
 *
 * @returns `true` if `o` is a `StringMap`
 */
export function isStringMap(o: unknown): o is StringMap {
   // Arrays and the array-like `arguments` variable are objects, so they would not be
   // caught by an `isObject` check
   if (!isStringUnknownMap(o)) {
      return false;
   }

   for (const k of Object.keys(o)) {
      if (!isString(o[k])) {
         return false;
      }
   }

   return true;
}
