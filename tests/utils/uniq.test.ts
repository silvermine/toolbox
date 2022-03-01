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

});
