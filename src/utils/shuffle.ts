export function shuffle<T>(list: readonly T[], random: () => number = Math.random): T[] {
   const result = [ ...list ];

   for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1)),
            temp = result[i];

      result[i] = result[j];
      result[j] = temp;
   }

   return result;
}
