import { isArray } from './is-array';

// NOTE: If changing these types, ensure the following cases cause a type error:
//
// const noProps = pick({ a: 1 });
//
// noProps.a; // Property 'a' does not exist on type 'Pick<{ a: number; }, never>'.
//
// const emptyArr = pick({ a: 1 }, []);
//
// emptyArr.a; // Property 'a' does not exist on type 'Pick<{ a: number; }, never>'.

export function pick<T extends object, K extends keyof T>(obj: T, props: K[]): Pick<T, K>;
export function pick<T extends object, K extends keyof T = never>(obj: T, ...props: K[]): Pick<T, K>;
export function pick<T extends object, K extends keyof T>(obj: T, ...args: K[] | [ K[] ]): Pick<T, K> {
   const props = ((args.length === 1 && isArray(args[0])) ? args[0] : args) as K[];

   return props.reduce((memo, prop) => {
      if (prop in obj) {
         memo[prop] = obj[prop];
      }
      return memo;
   }, {} as Pick<T, K>);
}
