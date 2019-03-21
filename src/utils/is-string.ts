import { isObject } from './is-object';
import { getTagString } from './get-tag-string';

export function isString(o: any): o is string {
   return typeof o === 'string' || (isObject(o) && getTagString(o) === '[object String]');
}
