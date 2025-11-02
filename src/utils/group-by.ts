import { PropsWithType } from '../types/PropsWithType';
import { hasDefined } from './has-defined';
import { isString } from './is-string';

/**
 * Given an array of items and a function that returns a key, groups the items by the key.
 * If the returned key is `undefined`, the item is not included in the result. If a string
 * is passed as the second argument, the item is grouped by the values of that property.
 */
export function groupBy<T, U extends string>(items: T[], fn: ((item: T) => string | undefined) | PropsWithType<T, string>): Record<U, T[] | undefined> {
   const keyFn = typeof fn === 'function' ? fn : (item: T) => {
      const key = item[fn];

      return isString(key) ? key : undefined;
   };

   return items.reduce((memo, item) => {
      const key = keyFn(item);

      if (key === undefined) {
         return memo;
      }

      if (hasDefined(memo, key)) {
         memo[key].push(item);
      } else {
         memo[key] = [ item ];
      }

      return memo;
   }, {} as Record<string, T[] | undefined>);
}
