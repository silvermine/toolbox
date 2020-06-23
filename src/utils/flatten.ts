export function flatten<T>(...lists: T[][]): T[] {
   return lists.reduce((memo, list) => {
      return memo.concat(list);
   }, [] as T[]);
}
