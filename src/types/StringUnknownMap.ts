import { isObject } from '../utils/is-object';
import { isArray } from '../utils/is-array';
import { isArguments } from '../utils/is-arguments';

export interface StringUnknownMap { [s: string]: unknown }

export function isStringUnknownMap(o: any): o is StringUnknownMap {
   return isObject(o) && !isArray(o) && !isArguments(o);
}
