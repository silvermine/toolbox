import { expect } from 'chai';
import * as t from '../../src/index';


describe('isPromiseLike', () => {

   class PromiseLikeClass {
      public then(): void {
         // Empty
      }
   }

   it('correctly classifies Promise-like objects', () => {
      expect(t.isPromiseLike(Promise.resolve())).to.strictlyEqual(true);
      // Even though the `PromiseLikeClass`'s `then` method does not return the correct
      // value (a Promise or PromiseLike), there's no way to check this at runtime without
      // calling the function.
      expect(t.isPromiseLike(new PromiseLikeClass())).to.strictlyEqual(true);
   });

   it('correctly classifies non-Promise-like objects', () => {
      expect(t.isPromiseLike('')).to.strictlyEqual(false);
      expect(t.isPromiseLike('4')).to.strictlyEqual(false);
      expect(t.isPromiseLike(4)).to.strictlyEqual(false);
      expect(t.isPromiseLike(true)).to.strictlyEqual(false);
      expect(t.isPromiseLike(undefined)).to.strictlyEqual(false);
      expect(t.isPromiseLike(null)).to.strictlyEqual(false);
      expect(t.isPromiseLike({ length: 0 })).to.strictlyEqual(false);
      // eslint-disable-next-line no-empty-function
      expect(t.isPromiseLike(() => {})).to.strictlyEqual(false);
   });

});
