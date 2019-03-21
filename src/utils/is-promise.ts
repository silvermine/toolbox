import { isObject } from './is-object';
import { getTagString } from './get-tag-string';

/**
 * Type guard for `Promise`s.
 *
 * @returns `true` if `o` is a `Promise`
 */
export function isPromise(o: any): o is Promise<unknown> {
   return isObject(o) && getTagString(o) === '[object Promise]';
}
