import { isObject } from './is-object';
import { getTagString } from './get-tag-string';

/**
 * Type guard for `string`s.
 *
 * @returns `true` if `o` is a `string`. `null` and `undefined` are not counted as
 * `string` values, even if the TypeScript compiler's `strictNullChecks` flag is set to
 * `false` in your project.
 */
export function isString(o: any): o is string {
   return typeof o === 'string' || (isObject(o) && getTagString(o) === '[object String]');
}
