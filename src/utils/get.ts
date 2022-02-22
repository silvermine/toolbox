/**
 * Much of the code in this file is adapted from Lodash's _.get implementation:
 *
 * https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/get.js
 * https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/.internal/baseGet.js
 * https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/.internal/castPath.js
 * https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/.internal/stringToPath.js
 * https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/.internal/toKey.js
 */
import { getTagString } from './get-tag-string';
import { isObject } from './is-object';

function isSymbol(value: unknown): value is symbol {
   const type = typeof value;

   return (type === 'symbol') || (
      type === 'object' &&
      value !== undefined &&
      value !== null &&
      getTagString(value) === '[object Symbol]'
   );
}

function toKey(value: unknown): string | symbol {
   if (typeof value === 'string' || isSymbol(value)) {
      return value;
   }

   return Object.is(value, -0) ? '-0' : `${value}`;
}

const IS_DEEP_PROP_REGEX = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      IS_PLAIN_PROP_REGEX = /^\w*$/;

function isKey(value: any, object: any): boolean {
   if (Array.isArray(value)) {
      return false;
   }
   const type = typeof value;

   if (type === 'number' || type === 'boolean' || value === null || value === undefined || isSymbol(value)) {
      return true;
   }

   return IS_PLAIN_PROP_REGEX.test(value) || !IS_DEEP_PROP_REGEX.test(value) ||
      (object !== null && object !== undefined && value in Object(object));
}

const DOT_CHAR_CODE = '.'.charCodeAt(0),
      ESCAPE_CHAR_REGEX = /\\(\\)?/g;

/* eslint-disable no-useless-concat */
const PROP_NAME_REGEX = RegExp(
   // Match anything that isn't a dot or bracket.
   '[^.[\\]]+' + '|' +
   // Or match property names within brackets.
   '\\[(?:' +
      // Match a non-string expression.
      '([^"\'][^[]*)' + '|' +
      // Or match strings (supports escaping characters).
      '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
   ')\\]' + '|' +
   // Or match "" as the space between consecutive dots or empty brackets.
   '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
   'g'
);
/* eslint-enable no-useless-concat */

function stringToPath(str: string): string[] {
   const result: string[] = [];

   if (str.charCodeAt(0) === DOT_CHAR_CODE) {
      result.push('');
   }

   str.replace(PROP_NAME_REGEX, (match, expression, quote, subString) => {
      let key = match;

      if (quote) {
         key = subString.replace(ESCAPE_CHAR_REGEX, '$1');
      } else if (expression) {
         key = expression;
      }

      result.push(key);

      // The types for this callback require us to return a string, but we don't really
      // care about the result of the call to `replace`, so we just return an empty string
      // here.
      return '';
   });

   return result;
}

function createPathArray(value: any, object: any): string[] {
   if (Array.isArray(value)) {
      return value;
   }

   return isKey(value, object) ? [ value ] : stringToPath(value);
}

interface StringRepresentable {
   toString(): string;
}

function get<TObject extends object, TKey extends keyof TObject>(
   obj: TObject,
   path: TKey | [TKey]
): TObject[TKey] | undefined;
function get<TObject extends object, TKey extends keyof TObject>(
   obj: TObject,
   path: TKey | [TKey],
   defaultValue: TObject[TKey]
): TObject[TKey];
function get<TObject extends object, TResult = unknown>(
   obj: TObject,
   path: StringRepresentable | StringRepresentable[],
   defaultValue: TResult
): TResult;
function get<TObject extends object, TResult = unknown>(
   obj: TObject,
   path: StringRepresentable | StringRepresentable[]
): TResult | undefined;
function get<TResult = unknown>(
   obj: unknown,
   path: StringRepresentable | StringRepresentable[],
   defaultValue?: TResult
): TResult | undefined {
   if (!isObject(obj)) {
      return defaultValue;
   }

   const pathArray = createPathArray(path, obj),
         length = pathArray.length;

   let index = 0,
       resultObj: unknown = obj;

   while (resultObj !== null && resultObj !== undefined && index < length) {
      resultObj = (resultObj as any)[toKey(pathArray[index])];

      index += 1;
   }

   const result = (index > 0 && index === length) ? resultObj : undefined;

   if (result === undefined) {
      return defaultValue;
   }

   return result as TResult | undefined;
}

export { get };
