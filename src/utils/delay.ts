export function delay<T = undefined>(ms: number, value?: T): Promise<T> {
   return new Promise((resolve) => {
      setTimeout(() => { resolve(value); }, ms);
   });
}
