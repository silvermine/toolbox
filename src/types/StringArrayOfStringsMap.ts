import { isArguments } from '../utils/is-arguments';
import { isArrayOfStrings } from '../utils/is-array-of-strings';
import { isObject } from '../utils/is-object';
import { isArray } from '../utils/is-array';

export interface StringArrayOfStringsMap { [s: string]: string[] }

export function isStringArrayOfStringsMap(o: any): o is StringArrayOfStringsMap {
   // Arrays and the array-like `arguments` variable are objects, so they would not be
   // caught by an `isObject` check
   if (!isObject(o) || isArray(o) || isArguments(o)) {
      return false;
   }

   for (let k of Object.keys(o)) {
      if (!isArrayOfStrings((o as any)[k])) {
         return false;
      }
   }

   return true;
}
