type FalsyVals = '' | 0 | false | null | undefined;

function notFalsy<T>(value: T | FalsyVals): value is T {
   return value !== ''
      && value !== 0
      && value !== false
      && value !== null
      && value !== undefined
      && !(typeof value === 'number' && isNaN(value));
}

export function compact<T>(arr: (T | FalsyVals)[]): T[] {
   return arr.filter(notFalsy);
}
