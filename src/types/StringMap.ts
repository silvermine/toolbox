import { isObject } from '../utils/is-object';
import { isArray } from '../utils/is-array';
import { isArguments } from '../utils/is-arguments';
import { isString } from '../utils/is-string';

export interface StringMap { [s: string]: string }

export function isStringMap(o: any): o is StringMap {
   // Arrays and the array-like `arguments` variable are objects, so they would not be
   // caught by an `isObject` check
   if (!isObject(o) || isArray(o) || isArguments(o)) {
      return false;
   }

   for (let k of Object.keys(o)) {
      if (!isString((o as any)[k])) {
         return false;
      }
   }

   return true;
}
