import { expect } from 'chai';
import { flatten } from '../../src';

describe('flatten', () => {

   it('flattens arrays', () => {
      // In this test we keep the result as a separate, explicitly-typed variable just so
      // we can make sure the types on flatten are correct.
      const result: string[] = flatten([ 'a', 'b', 'c' ], [ 'd', 'e' ], [ 'f' ]);

      expect(result).to.eql([ 'a', 'b', 'c', 'd', 'e', 'f' ]);
   });

   it('works with empty arrays interspersed', () => {
      expect(flatten([ 'a', 'b', 'c' ], [ 'd', 'e' ], [], [ 'f' ])).to.eql([ 'a', 'b', 'c', 'd', 'e', 'f' ]);
   });

   it('works with only empty arrays', () => {
      expect(flatten([], [], [])).to.eql([]);
   });

});
