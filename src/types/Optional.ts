import { Omit } from './Omit';

/**
 * Makes the specified required properties optional. This is similar to the native
 * `Partial` type, the main difference being `Optional` allows you to make some of the
 * properties optional instead of making all properties optional.
 *
 * For example, if `Optional<MyObject, 'anotherProp'>` is used on:
 *
 * ```
 * interface MyObject {
 *    prop: string;
 *    anotherProp: number;
 * }
 * ```
 *
 * The resulting type will be:
 *
 * ```
 * {
 *    prop: string;
 *    anotherProp?: number;
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-type-alias
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
