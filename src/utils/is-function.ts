/**
 * Type guard for functions.
 *
 * @returns `true` if `o` is a `function`.
 */
export function isFunction(o: unknown): o is Function { // eslint-disable-line @typescript-eslint/ban-types
   return typeof o === 'function';
}
