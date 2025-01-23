import { isArrayOfStrings } from '../utils/is-array-of-strings';
import { isString } from '../utils/is-string';
import { isStringUnknownMap } from './StringUnknownMap';

/**
 * `KeyValueStringObject`s have `string`s as keys and one of:
 *
 *    * `string`
 *    * `string[]`
 *    * `KeyValueStringObject`
 *
 * as values. For example:
 *
 * ```
 * const obj: KeyValueStringObject = {
 *    key: 'value',
 *    arr: [ 'must , 'be', 'strings' ],
 *    obj: {
 *       same: 'structure',
 *       anotherArr: [],
 *       obj: {}, // ... can be nested many levels deep
 *    }.
 * };
 * ```
 */
export interface KeyValueStringObject { [k: string]: (string | string[] | KeyValueStringObject) }

/**
 * Type guard for `KeyValueStringObject`.
 *
 * @returns `true` if `o` is a `KeyValueStringObject`
 */
export function isKeyValueStringObject(o: unknown): o is KeyValueStringObject {
   // Arrays and the array-like `arguments` variable are objects, so they would not be
   // caught by an `isObject` check
   if (!isStringUnknownMap(o)) {
      return false;
   }

   for (const k of Object.keys(o)) {
      const v: unknown = o[k];

      if (!isString(v) && !isArrayOfStrings(v) && !isKeyValueStringObject(v)) {
         return false;
      }
   }

   return true;
}
