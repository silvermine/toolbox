/**
 * Provides all the property names of a certain type (`T`) that are available on the given
 * type (`O`). For example:
 *
 * ```
 * interface MyObject {
 *    readonly prop: string;
 *    readonly anotherProp: number;
 *    readonly additionalProp: number;
 * }
 *
 * function getNumber(from: MyObject, field: PropsWithType<MyObject, number>): number {
 *    // `field` will only be allowed to be `anotherProp` or `additionalProp`
 *    return from[field];
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-type-alias
export type PropsWithType<O, T> = keyof Pick<O, {
   [K in keyof O]: O[K] extends T ? K : never;
}[keyof O]>;
