import { isPromise } from './is-promise';
import { isObject } from './is-object';

/**
 * Type guard for the `PromiseLike` interface. Simply checks to see if `o` is an `object`
 * and has a `then` function. It does *not* guarantee that the `then` function returns a
 * `Promise` or that it conforms to the `Promise` specification.
 *
 * @returns `true` if `o` is `Promise`-like (i.e. has a `then` function)
 */
export function isPromiseLike(o: any): o is PromiseLike<unknown> {
   return isPromise(o) || (isObject(o) && typeof (o as any).then === 'function');
}
