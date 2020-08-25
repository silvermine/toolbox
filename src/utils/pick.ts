export function pick<T, K extends keyof T>(o: T, ...keys: K[]): Pick<T, K> {
   return keys.reduce((memo, k) => {
      memo[k] = o[k];
      return memo;
   }, {} as any);
}
