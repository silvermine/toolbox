import { expect } from 'chai';
import { uniq } from '../../src';

describe('uniq', () => {

   it('works with sorted arrays', () => {
      expect(uniq([ 1, 1, 2, 3, 4, 4 ], true)).to.eql([ 1, 2, 3, 4 ]);
   });


   it('works with unsorted arrays', () => {
      expect(uniq([ 4, 4, 1, 1, 2, 3, 4 ])).to.eql([ 4, 1, 2, 3 ]);
   });


   it('works with a custom identity function', () => {
      const isEven = (i: number): boolean => {
         return (i % 2 === 0);
      };

      expect(uniq([ 4, 4, 1, 1, 2, 3, 4 ], false, isEven)).to.eql([ 4, 1 ]);
   });


   it('handles 40,000 elements in under 50ms', () => {
      const arr: string[] = [];

      for (let i = 0; i < 40000; i++) {
         arr.push('item-' + (Math.random() < 0.3 ? i % Math.floor(40000 * 0.7) : i));
      }

      // Warmup to avoid JIT noise
      uniq(arr);

      const start = performance.now(),
            result = uniq(arr);

      expect(performance.now() - start).to.be.lessThan(50);
      expect(result.length).to.be.greaterThan(0);
      expect(result.length).to.be.lessThan(arr.length);
   });


   it('handles 40,000 elements with iteratee in under 50ms', () => {
      const arr: string[] = [];

      for (let i = 0; i < 40000; i++) {
         arr.push('item-' + i);
      }

      // Iteratee that produces many unique computed values, causing the
      // seen array to grow large and indexOf to become O(n)
      const iteratee = (v: string): string => {
         return v + '-computed';
      };

      // Warmup
      uniq(arr, false, iteratee);

      const start = performance.now(),
            result = uniq(arr, false, iteratee);

      expect(performance.now() - start).to.be.lessThan(50);
      expect(result.length).to.strictlyEqual(40000);
   });

});
