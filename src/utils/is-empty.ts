import { isArray } from './is-array';
import { isString } from './is-string';
import { isArguments } from './is-arguments';

export function isEmpty(o: any): boolean {
   if (o === null || typeof o === 'undefined') {
      return true;
   }
   if (isArray(o) || isString(o) || isArguments(o)) {
      return o.length === 0;
   }
   return Object.keys(o).length === 0;
}
