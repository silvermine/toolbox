import { expect } from 'chai';
import * as t from '../../src/index';


describe('isObject', () => {

   class TestClass {}

   it('correctly classifies objects', () => {
      expect(t.isObject({})).to.strictlyEqual(true);
      expect(t.isObject({ a: true })).to.strictlyEqual(true);
      // eslint-disable-next-line no-new-object
      expect(t.isObject(new Object())).to.strictlyEqual(true);
      // Arrays are objects too
      expect(t.isObject([])).to.strictlyEqual(true);
      expect(t.isObject(new TestClass())).to.strictlyEqual(true);
      // Functions are objects too
      // eslint-disable-next-line no-empty-function
      expect(t.isObject(() => {})).to.strictlyEqual(true);
      expect(t.isObject(TestClass)).to.strictlyEqual(true);
   });

   it('correctly classifies non-objects', () => {
      expect(t.isObject('')).to.strictlyEqual(false);
      expect(t.isObject('4')).to.strictlyEqual(false);
      expect(t.isObject(4)).to.strictlyEqual(false);
      expect(t.isObject(true)).to.strictlyEqual(false);
      expect(t.isObject(undefined)).to.strictlyEqual(false);
      expect(t.isObject(null)).to.strictlyEqual(false);
   });

});
