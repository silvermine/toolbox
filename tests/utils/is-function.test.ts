import { expect } from 'chai';
import * as t from '../../src/index';


describe('isFunction', () => {

   it('correctly classifies functions', () => {
      expect(t.isFunction(() => { /** noop */ })).to.strictlyEqual(true);
      expect(t.isFunction(function() { /** noop */ })).to.strictlyEqual(true);
      expect(t.isFunction(Array.isArray)).to.strictlyEqual(true);
      // eslint-disable-next-line no-new-func
      expect(t.isFunction(new Function())).to.strictlyEqual(true);
   });

   it('correctly classifies non-functions', () => {
      expect(t.isFunction({})).to.strictlyEqual(false);
      expect(t.isFunction([])).to.strictlyEqual(false);
      expect(t.isFunction(false)).to.strictlyEqual(false);
      expect(t.isFunction(true)).to.strictlyEqual(false);
      expect(t.isFunction(undefined)).to.strictlyEqual(false);
      expect(t.isFunction(null)).to.strictlyEqual(false);
      expect(t.isFunction('function')).to.strictlyEqual(false);
      expect(t.isFunction(123)).to.strictlyEqual(false);
   });

});
