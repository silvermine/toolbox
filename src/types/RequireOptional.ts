/**
 * Makes the specified optional properties required. This is similar to the native
 * `Required` type, the main difference being `RequiredOptional` allows you to only make
 * some of the optional properties required instead of requiring all optional properties.
 * type (`O`). For example:
 *
 * ```
 * interface MyObject {
 *    prop: string;
 *    optionalProp?: number;
 *    anotherOptionalProp?: number;
 * }
 *
 * function getNumber(obj: RequireOptional<MyObject, 'optionalProp'>): number {
 *    // When `obj` is passed in, it must contain the property `optionalProp`, but will
 *    // not need to contain `anotherOptionalProp`.
 *    return obj.optionalProp;
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-type-alias
export type RequireOptional<T, K extends keyof T> = T & {
   [P in K]-?: T[P];
};
