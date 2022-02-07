export function chunk<T>(list: readonly T[], size: number): T[][] {
   if (size < 1) {
      return [];
   }

   const result: T[][] = [];

   let i = 0;

   while (i < list.length) {
      result.push(list.slice(i, i + size));
      i = i + size;
   }

   return result;
}
