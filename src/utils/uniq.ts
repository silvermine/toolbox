const iterateeUniq = <T, U>(arr: T[], iteratee: (value: T, i: number, arr: T[]) => U): T[] => {
   const result: T[] = [],
         seen: U[] = [];

   for (let i = 0, length = arr.length; i < length; i++) {
      const value = arr[i],
            computed = iteratee(value, i, arr);

      if (seen.indexOf(computed) === -1) {
         seen.push(computed);
         result.push(value);
      }
   }
   return result;
};


const sortedUniq = <T, U>(arr: T[]): T[] => {
   const result: T[] = [];

   let lastSeen: T | U | undefined;

   for (let i = 0, length = arr.length; i < length; i++) {
      const value = arr[i];

      if (i === 0 || lastSeen !== value) {
         result.push(value);
      }
      lastSeen = value;
   }
   return result;
};


const standardUniq = <T>(arr: T[]): T[] => {
   const result = arr.filter((value, index, _arr) => {
      return _arr.indexOf(value) === index;
   });

   return result;
};


/**
 * Produce a duplicate-free version of the array. If the array has already
 * been sorted, you have the option of using a faster algorithm.
 * The faster algorithm will not work with an iteratee if the iteratee
 * is not a one-to-one function, so providing an iteratee will disable
 * the faster algorithm.
 */
export const uniq = <T, U>(arr: T[], isSorted?: boolean, iteratee?: (value: T, i: number, arr: T[]) => U): T[] => {
   if (iteratee) {
      return iterateeUniq(arr, iteratee);
   }
   if (isSorted) {
      return sortedUniq(arr);
   }
   return standardUniq(arr);
};
