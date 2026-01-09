import { isStringUnknownMap, StringUnknownMap } from '../types/StringUnknownMap';
import { isFunction } from './is-function';

/**
 * JSON replacer that recursively sorts object keys to ensure consistent serialization.
 *
 * @example
 * ```
 * JSON.stringify(query, sortKeysReplacer);
 * ```
 */
export function sortKeysReplacer(_key: string, value: unknown): unknown {
   if (isStringUnknownMap(value) && !isFunction(value)) {
      return Object.keys(value).sort().reduce((memo, k) => {
         memo[k] = value[k];
         return memo;
      }, {} as StringUnknownMap);
   }
   return value;
}
