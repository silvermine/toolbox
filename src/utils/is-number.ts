import { getTagString } from './get-tag-string';
import { isObject } from './is-object';

/**
 * Type guard for `number`s.
 *
 * @returns `true` if `o` is a `number`. `NaN`, `Infinity`, and `-Infinity` *are*
 * considered `number`s. If you need to check for one of those values, you can use the
 * built-in `Number.isNaN` or `Number.isFinite` functions.
 */
export function isNumber(o: any): o is number {
   return typeof o === 'number' || (isObject(o) && getTagString(o) === '[object Number]');
}
