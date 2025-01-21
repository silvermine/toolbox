import { expect } from 'chai';
import * as t from '../../src/index';


describe('isNull', () => {

   it('correctly classifies null things', () => {
      let o;

      expect(t.isNull(o)).to.strictlyEqual(false);
      expect(t.isNull(undefined)).to.strictlyEqual(false);
      expect(t.isNull(null)).to.strictlyEqual(true);

      const obj: any = { bar: 1, baz: false, bag: undefined, bah: null };

      expect(t.isNull(obj.foo)).to.strictlyEqual(false);
      expect(t.isNull(obj.bar)).to.strictlyEqual(false);
      expect(t.isNull(obj.baz)).to.strictlyEqual(false);
      expect(t.isNull(obj.bag)).to.strictlyEqual(false);
      expect(t.isNull(obj.bah)).to.strictlyEqual(true);
   });

});
