/* eslint-disable @typescript-eslint/no-type-alias */

type UnionKeys<T> = T extends unknown ? keyof T : never;
type InvalidKeys<K extends string | number | symbol> = { [P in K]?: never };
type StrictUnionHelper<T, TAll> = T extends unknown ? (T & InvalidKeys<Exclude<UnionKeys<TAll>, keyof T>>) : never;

/**
 * A basic TypeScript union (e.g. A | B) results in a type containing the available
 * properties from the provided types. When StrictUnion is used (e.g. StrictUnion<A | B>),
 * the resulting type can only contain the properties from one of the types (e.g. all the
 * properties from A, but none of the properties from B).
 *
 * See: https://github.com/microsoft/TypeScript/issues/20863#issuecomment-520551758
 */
export type StrictUnion<T> = StrictUnionHelper<T, T>;
