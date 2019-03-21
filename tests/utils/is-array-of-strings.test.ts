import { expect } from 'chai';
import * as t from '../../src/index';


describe('isArrayOfStrings', () => {

   it('correctly classifies arrays', () => {
      expect(t.isArrayOfStrings([])).to.strictlyEqual(true);
      expect(t.isArrayOfStrings([ 'a', 'b', 'c', '' ])).to.strictlyEqual(true);
      expect(t.isArrayOfStrings([ 4 ])).to.strictlyEqual(false);
      expect(t.isArrayOfStrings([ 'a', 'b', 'c', 4 ])).to.strictlyEqual(false);
   });

   it('correctly classifies non-arrays', () => {
      expect(t.isArrayOfStrings({})).to.strictlyEqual(false);
      expect(t.isArrayOfStrings(4)).to.strictlyEqual(false);
      expect(t.isArrayOfStrings('')).to.strictlyEqual(false);
      expect(t.isArrayOfStrings('a')).to.strictlyEqual(false);
      expect(t.isArrayOfStrings(true)).to.strictlyEqual(false);
      expect(t.isArrayOfStrings(undefined)).to.strictlyEqual(false);
      expect(t.isArrayOfStrings(null)).to.strictlyEqual(false);
      // eslint-disable-next-line no-empty-function
      expect(t.isArrayOfStrings(() => {})).to.strictlyEqual(false);
   });

});
