/**
 * Makes the specified optional properties required. Also works where the property is
 * defined as `property: foo | undefined`, ensuring that `property` is not undefined. For
 * example:
 *
 * ```
 * interface MyObject {
 *    prop: string;
 *    optionalProp?: number;
 *    propWithUndefined: string | undefined;
 * }
 *
 * function getString(obj: RequireOptional<MyObject, 'propWithUndefined'>): string {
 *    // When `obj` is passed in, it must contain the property `propWithUndefined`,
 *    // and `obj.propWithUndefined` can not be undefined. It will not need to contain
 *    // `optionalProp`.
 *    return obj.propWithUndefined;
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-type-alias
export type RequireDefined<T, K extends keyof T> = T & {
   [P in K]-?: Exclude<T[P], undefined>;
};
