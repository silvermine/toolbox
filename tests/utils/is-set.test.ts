import { expect } from 'chai';
import * as t from '../../src/index';


describe('isSet', () => {

   it('correctly classifies sets', () => {
      expect(t.isSet(new Set([]))).to.strictlyEqual(true);
      expect(t.isSet(new Set([ 'a', 'b', 'c' ]))).to.strictlyEqual(true);
      expect(t.isSet(new Set([ 4 ]))).to.strictlyEqual(true);
      expect(t.isSet(new Set([ 'a', 'b', 'c', 4 ]))).to.strictlyEqual(true);
      expect(t.isSet(new Set())).to.strictlyEqual(true);
   });

   it('correctly classifies non-sets', () => {
      expect(t.isSet([])).to.strictlyEqual(false);
      expect(t.isSet({})).to.strictlyEqual(false);
      expect(t.isSet(4)).to.strictlyEqual(false);
      expect(t.isSet('')).to.strictlyEqual(false);
      expect(t.isSet('a')).to.strictlyEqual(false);
      expect(t.isSet(true)).to.strictlyEqual(false);
      expect(t.isSet(undefined)).to.strictlyEqual(false);
      expect(t.isSet(null)).to.strictlyEqual(false);
      expect(t.isSet({ length: 0 })).to.strictlyEqual(false);
      // eslint-disable-next-line no-empty-function
      expect(t.isSet(() => {})).to.strictlyEqual(false);
   });

});
