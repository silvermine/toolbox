import { isArray } from './is-array';

// NOTE: If changing these types, ensure the following cases cause a type error:
//
// omit({ a: 1 }, 'b'); // '"b"' is not assignable to parameter of type '"a"'.
//
// omit({ a: 1, b: 2 }, 'a').a; // Property 'a' does not exist on type
//                              // 'Omit<{ a: number; b: number; }, "a">'.

/**
 * Returns a new object with every enumerable string-keyed property of `obj`, including
 * inherited ones, except the properties named in `props`. Symbol keys and class methods
 * are not copied, although the `Omit<T, K>` return type still lists them.
 */
export function omit<T extends object, K extends keyof T>(obj: T, props: K[]): Omit<T, K>;
export function omit<T extends object, K extends keyof T = never>(obj: T, ...props: K[]): Omit<T, K>;
export function omit<T extends object, K extends keyof T>(obj: T, ...args: K[] | [ K[] ]): Omit<T, K> {
   // `for...in` yields string keys, so numeric keys must be compared as strings.
   const omittedKeys = (((args.length === 1 && isArray(args[0])) ? args[0] : args) as K[]).map(String),
         entries: [ string, unknown ][] = [];

   // `for...in` visits inherited enumerable properties, which `omit` copies on purpose.
   // eslint-disable-next-line no-restricted-syntax
   for (const key in obj) {
      if (!omittedKeys.includes(key)) {
         entries.push([ key, obj[key] ]);
      }
   }

   // `Object.fromEntries` defines each key as an own property. Assigning with
   // `result[key] = value` would call the `__proto__` setter for an own `__proto__`
   // key (as `JSON.parse` creates), replacing the result's prototype instead of
   // copying the key.
   return Object.fromEntries(entries) as Omit<T, K>;
}
