import { expect } from 'chai';
import * as t from '../../src/index';


describe('isBoolean', () => {

   it('correctly classifies bools', () => {
      expect(t.isBoolean(true)).to.strictlyEqual(true);
      expect(t.isBoolean(false)).to.strictlyEqual(true);
      expect(t.isBoolean(null)).to.strictlyEqual(false);
      expect(t.isBoolean(0)).to.strictlyEqual(false);
      expect(t.isBoolean('')).to.strictlyEqual(false);
      expect(t.isBoolean({})).to.strictlyEqual(false);
   });

});
