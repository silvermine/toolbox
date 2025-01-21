import { expect } from 'chai';
import * as t from '../../src/index';


describe('isUndefined', () => {

   it('correctly classifies defined and undefined things', () => {
      let o;

      expect(t.isUndefined(o)).to.strictlyEqual(true);
      expect(t.isUndefined(undefined)).to.strictlyEqual(true);
      expect(t.isUndefined(null)).to.strictlyEqual(false);

      const obj: any = { bar: 1, baz: false, bag: undefined, bah: null };

      expect(t.isUndefined(obj.foo)).to.strictlyEqual(true);
      expect(t.isUndefined(obj.bar)).to.strictlyEqual(false);
      expect(t.isUndefined(obj.baz)).to.strictlyEqual(false);
      expect(t.isUndefined(obj.bag)).to.strictlyEqual(true);
      expect(t.isUndefined(obj.bah)).to.strictlyEqual(false);
   });

});
