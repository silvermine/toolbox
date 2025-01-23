import { isObject } from '../utils/is-object';
import { isArray } from '../utils/is-array';
import { isArguments } from '../utils/is-arguments';

/**
 * `StringUnknownMap`s have `string`s as keys and anything as values. For example:
 *
 * ```
 * const obj: StringUnknownMap = {
 *    key: 'value-can-be-a-string',
 *    arr: [ 'or', 'an', 'array', 100, 1000 ],
 *    obj: {},
 *    n: 1000,
 *    date: new Date(),
 * };
 * ```
 *
 * This type is useful when you know that a variable is an object but you do not know the
 * types of the values of its properties, or when you want the interface of an object to
 * be flexible. For example, you may use it to allow users of a `class` to pass in any
 * kind of custom data they want:
 *
 * ```
 * class MyLibraryClass {
 *
 *    constructor(customData: StringUnknownMap) {
 *
 *    }
 * }
 * ```
 *
 * Or, you could use it as the type of the response from a JSON API call:
 *
 * ```
 * interface ExampleAPIResponse {
 *    example: boolean;
 *    // ...
 * }
 *
 * function mapExampleAPIResponse(obj: StringUnknownMap): ExampleAPIResponse {
 *    // Check obj's properties and convert to an ExampleAPIResponse type
 * }
 *
 * fetch('https://example.com/api')
 *    .then((response) => { return response.json(); })
 *    .then((obj: StringUnknownMap) => {
 *       let ex: ExampleAPIResponse = mapExampleAPIResponse(obj);
 *
 *       // use `ex` here
 *    });
 * ```
 */
export interface StringUnknownMap { [s: string]: unknown }

/**
 * Type guard for `StringUnknownMap`.
 *
 * @returns `true` if `o` is a `StringUnknownMap`
 */
export function isStringUnknownMap(o: unknown): o is StringUnknownMap {
   return isObject(o) && !isArray(o) && !isArguments(o);
}
