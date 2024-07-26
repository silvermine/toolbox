/**
 * Type guard for `Set`s.
 *
 * @returns `true` if `o` is a `Set`, regardless of the types that it contains
 */
export function isSet(o: unknown): o is Set<unknown> {
   return o instanceof Set;
}
