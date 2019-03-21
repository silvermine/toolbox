import { getTagString } from './get-tag-string';
import { isObject } from './is-object';

export function isNumber(o: any): o is number {
   return typeof o === 'number' || (isObject(o) && getTagString(o) === '[object Number]');
}
