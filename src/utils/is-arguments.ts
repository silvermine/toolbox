import { getTagString } from './get-tag-string';

/**
 * Checks whether an object is a function's array-like `arguments` variable.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
 * @returns `true` if `o` is a function's array-like `arguments` variable
 */
export function isArguments(o: any): boolean {
   return getTagString(o) === '[object Arguments]';
}
