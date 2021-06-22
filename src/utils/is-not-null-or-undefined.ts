import { isNull } from './is-null';
import { isUndefined } from './is-undefined';


/**
 * Checks if `o` is not either null or undefined
 */
export function isNotNullOrUndefined<T>(o: T | null | undefined): o is T {
   return !(isNull(o) || isUndefined(o));
}
