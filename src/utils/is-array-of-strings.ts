import { isArray } from './is-array';
import { isString } from './is-string';

export function isArrayOfStrings(values: any): values is string[] {
   if (!isArray(values)) {
      return false;
   }

   for (let v of values) {
      if (!isString(v)) {
         return false;
      }
   }

   return true;
}
