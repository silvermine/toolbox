/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * start up to, but not including, end. A step of -1 is used if a negative start
 * is specified without an end or step. If end is not specified, it's set to
 * start with start then set to 0.
 */
export function range(start: number, end?: number, step?: number): number[] {
   if (end === undefined) {
      end = start;
      start = 0;
   }

   if (!step) {
      step = start < end ? 1 : -1;
   }

   const length = Math.max(Math.ceil((end - start) / step), 0),
         result = Array(length);

   for (let i = 0; i < length; i++) {
      result[i] = start + (i * step);
   }
   return result;
}
