/**
 * Type guard for `Array`s.
 *
 * @returns `true` if `o` is an `Array`, regardless of the types that it contains
 */
export function isArray(o: unknown): o is unknown[] {
   return Array.isArray(o);
}
