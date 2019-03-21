import { expect } from 'chai';
import * as t from '../../src/index';


describe('isString', () => {

   it('correctly classifies strings', () => {
      expect(t.isString('')).to.strictlyEqual(true);
      expect(t.isString('0')).to.strictlyEqual(true);
      // eslint-disable-next-line no-new-wrappers
      expect(t.isString(new String())).to.strictlyEqual(true);
   });

   it('correctly classifies non-strings', () => {
      expect(t.isString({})).to.strictlyEqual(false);
      expect(t.isString([])).to.strictlyEqual(false);
      expect(t.isString(false)).to.strictlyEqual(false);
      expect(t.isString(true)).to.strictlyEqual(false);
      expect(t.isString(undefined)).to.strictlyEqual(false);
      expect(t.isString(null)).to.strictlyEqual(false);
      expect(t.isString({ length: 0 })).to.strictlyEqual(false);
      // eslint-disable-next-line no-empty-function
      expect(t.isString(() => {})).to.strictlyEqual(false);
   });

});
