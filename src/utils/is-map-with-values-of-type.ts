import { isStringUnknownMap } from '../types/StringUnknownMap';

/**
 * Type guard for `Record<string, TypeThatYouSpecify>`.
 *
 * @returns `true` if `o` is a map with `string` keys and values that pass the provided
 * type guard.
 */
export function isMapWithValuesOfType<T>(guard: (x: unknown) => x is T, o: unknown): o is Record<string, T> {
   if (!isStringUnknownMap(o)) {
      return false;
   }

   for (const k of Object.keys(o)) {
      if (!guard(o[k])) {
         return false;
      }
   }

   return true;
}
