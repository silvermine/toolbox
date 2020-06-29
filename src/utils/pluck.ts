export function pluck<T, K extends keyof T>(sources: T[], key: K): T[K][] {
   return sources.map((o) => {
      return o[key];
   });
}
