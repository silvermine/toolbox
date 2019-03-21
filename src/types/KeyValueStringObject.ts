import { isObject } from '../utils/is-object';
import { isArray } from '../utils/is-array';
import { isArguments } from '../utils/is-arguments';
import { isArrayOfStrings } from '../utils/is-array-of-strings';
import { isString } from '../utils/is-string';

export interface KeyValueStringObject { [k: string]: (string | string[] | KeyValueStringObject) }

export function isKeyValueStringObject(o: any): o is KeyValueStringObject {
   // Arrays and the array-like `arguments` variable are objects, so they would not be
   // caught by an `isObject` check
   if (!isObject(o) || isArray(o) || isArguments(o)) {
      return false;
   }

   for (let k of Object.keys(o)) {
      let v: any = (o as any)[k];

      if (!isString(v) && !isArrayOfStrings(v) && !isKeyValueStringObject(v)) {
         return false;
      }
   }

   return true;
}
