import { isArray } from './is-array';
import { isString } from './is-string';
import { isArguments } from './is-arguments';
import { isUndefined } from './is-undefined';
import { isNull } from './is-null';
import { isBoolean } from './is-boolean';
import { isNumber } from './is-number';
import { isSet } from './is-set';
import { isObject } from './is-object';


interface IEmptyArguments extends IArguments {
   length: 0;
}

interface IEmptyObj {
   [s: string]: never;
}

type IEmptyTypes = (
   null |
   undefined |
   boolean |
   number |
   never[] |
   '' |
   IEmptyArguments |
   Set<never> |
   IEmptyObj
);

/**
 * Checks if `o` is an empty object. An object is "empty" if it:
 *
 *    * Is an `arguments` object, array, or `string`, and has a `length` of `0`
 *    * Is an `object` with no enumerable keys in its prototype
 *    * Is `null`, `undefined`, `boolean`, or a `number`
 *
 * @returns `true` if `o` is empty
 */
export function isEmpty(o: unknown[]): boolean;
export function isEmpty(o: object): boolean;
export function isEmpty(o: unknown): o is IEmptyTypes;
export function isEmpty(o: unknown): boolean {
   if (isNull(o) || isUndefined(o) || isBoolean(o) || isNumber(o)) {
      return true;
   }
   if (isArray(o) || isString(o) || isArguments(o)) {
      return o.length === 0;
   }
   if (isSet(o)) {
      return o.size === 0;
   }
   return isObject(o) && Object.keys(o).length === 0;
}
