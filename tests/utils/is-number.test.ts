import { expect } from 'chai';
import * as t from '../../src/index';


describe('isNumber', () => {

   it('correctly classifies numbers', () => {
      expect(t.isNumber(-1)).to.strictlyEqual(true);
      expect(t.isNumber(0)).to.strictlyEqual(true);
      expect(t.isNumber(1)).to.strictlyEqual(true);
      expect(t.isNumber(999)).to.strictlyEqual(true);
      expect(t.isNumber(3.14)).to.strictlyEqual(true);
      // eslint-disable-next-line no-new-wrappers
      expect(t.isNumber(new Number(10))).to.strictlyEqual(true);
      // Suprisingly, JavaScript considers NaN to be a number
      expect(t.isNumber(NaN)).to.strictlyEqual(true);
      expect(t.isNumber(Infinity)).to.strictlyEqual(true);
   });

   it('correctly classifies non-numbers', () => {
      expect(t.isNumber({})).to.strictlyEqual(false);
      expect(t.isNumber([])).to.strictlyEqual(false);
      expect(t.isNumber([ 4 ])).to.strictlyEqual(false);
      expect(t.isNumber('')).to.strictlyEqual(false);
      expect(t.isNumber('4')).to.strictlyEqual(false);
      expect(t.isNumber(false)).to.strictlyEqual(false);
      expect(t.isNumber(true)).to.strictlyEqual(false);
      expect(t.isNumber(undefined)).to.strictlyEqual(false);
      expect(t.isNumber(null)).to.strictlyEqual(false);
      expect(t.isNumber({ length: 0 })).to.strictlyEqual(false);
      // eslint-disable-next-line no-empty-function
      expect(t.isNumber(() => {})).to.strictlyEqual(false);
   });

});
