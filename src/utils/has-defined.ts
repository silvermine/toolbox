import { isUndefined } from './is-undefined';
import { RequireDefined } from '../types/RequireDefined';
import { UnionKeys } from '../types/UnionKeys';

/**
 * Tests that an optional or possibly-undefined property on type `T` is defined (that is,
 * not undefined) on object `o`. This is necessary if you want to pass an object that is
 * type `T` to a function that takes argument `RequireOptional<T, U>` or
 * `RequireDefined<T, U>` because checks like `val.optionalField` do not add the type
 * safety necessary to allow passing the argument.
 *
 * See [the test for this
 * function](https://github.com/silvermine/toolbox/blob/master/tests/utils/has-defined.test.ts)
 * for examples of where this is helpful.
 *
 * @see https://github.com/microsoft/TypeScript/issues/33205#issuecomment-528182920
 *
 * @param o the object to test
 * @param propName the name of the optional or possibly-undefined property that you want
 * to be required
 */
export function hasDefined<T, U extends keyof T | UnionKeys<T>>(o: T, propName: U): o is RequireDefined<Extract<T, { [key in U]?: unknown }>, U> {
   return Object.prototype.hasOwnProperty.call(o, propName) && !isUndefined(o[propName]);
}
