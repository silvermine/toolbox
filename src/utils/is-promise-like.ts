import { isPromise } from './is-promise';
import { isObject } from './is-object';

export function isPromiseLike(o: any): o is PromiseLike<unknown> {
   return isPromise(o) || (isObject(o) && typeof (o as any).then === 'function');
}
