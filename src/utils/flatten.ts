export function flatten<T>(...lists: Readonly<Readonly<T[]>[]>): T[] {
   return lists.reduce((memo: T[], list) => {
      return memo.concat(list);
   }, [] as T[]);
}
