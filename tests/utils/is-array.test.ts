import { expect } from 'chai';
import * as t from '../../src/index';


describe('isArray', () => {

   it('correctly classifies arrays', () => {
      expect(t.isArray([])).to.strictlyEqual(true);
      expect(t.isArray([ 'a', 'b', 'c' ])).to.strictlyEqual(true);
      expect(t.isArray([ 4 ])).to.strictlyEqual(true);
      expect(t.isArray([ 'a', 'b', 'c', 4 ])).to.strictlyEqual(true);
      // eslint-disable-next-line
      expect(t.isArray(new Array())).to.strictlyEqual(true);
   });

   it('correctly classifies non-arrays', () => {
      expect(t.isArray({})).to.strictlyEqual(false);
      expect(t.isArray(4)).to.strictlyEqual(false);
      expect(t.isArray('')).to.strictlyEqual(false);
      expect(t.isArray('a')).to.strictlyEqual(false);
      expect(t.isArray(true)).to.strictlyEqual(false);
      expect(t.isArray(undefined)).to.strictlyEqual(false);
      expect(t.isArray(null)).to.strictlyEqual(false);
      expect(t.isArray({ length: 0 })).to.strictlyEqual(false);
      // eslint-disable-next-line no-empty-function
      expect(t.isArray(() => {})).to.strictlyEqual(false);
   });

});
