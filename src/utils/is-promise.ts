import { isObject } from './is-object';
import { getTagString } from './get-tag-string';

export function isPromise(o: any): o is Promise<unknown> {
   return isObject(o) && getTagString(o) === '[object Promise]';
}
