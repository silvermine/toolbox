/**
 * Extracts all the keys of a union type. For example:
 *
 * ```
 * type Union = { a: number } | { b: string };
 * type Keys = UnionKeys<Union>; // 'a' | 'b'
 * ```
 */
export type UnionKeys<T> = T extends T ? keyof T : never;
