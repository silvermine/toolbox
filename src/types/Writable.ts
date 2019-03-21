/* istanbul ignore next */

/**
 * Removes the `readonly` modifier and makes all keys writable again. This is useful if
 * you need to dynamically create an object whose type is normally not writable. For
 * example:
 *
 * ```
 * interface MyObject {
 *    readonly prop: string;
 *    readonly anotherProp: number;
 * }
 *
 * function cloneMyObject(from: MyObject): MyObject {
 *    let keys: (keyof MyObject)[] = [ 'prop', 'anotherProp' ];
 *
 *    return keys.reduce((obj, key) => {
 *       obj[key] = from[key]; // This would cause a type error without Writable<T>
 *       return obj;
 *    }, {} as Writable<MyObject>);
 * }
 * ```
 */
export type Writable<T> = { -readonly [P in keyof T]: T[P] }
