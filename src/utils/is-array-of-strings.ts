import { isArray } from './is-array';
import { isString } from './is-string';

/**
 * Type guard for `string[]`.
 *
 * @returns `true` if `o` is an array of `string` values only. `null` and `undefined` are
 * not counted as `string` values, even if the TypeScript compiler's `strictNullChecks`
 * flag is set to `false` in your project.
 */
export function isArrayOfStrings(values: unknown): values is string[] {
   if (!isArray(values)) {
      return false;
   }

   for (const v of values) {
      if (!isString(v)) {
         return false;
      }
   }

   return true;
}
