import { expect } from 'chai';
import * as t from '../../src/index';


describe('isPromise', () => {

   class PromiseLikeClass {
      public then(): void {
         // Empty
      }
   }

   it('correctly classifies Promise objects', () => {
      expect(t.isPromise(Promise.resolve())).to.strictlyEqual(true);
   });

   it('correctly classifies non-Promise objects', () => {
      expect(t.isPromise('')).to.strictlyEqual(false);
      expect(t.isPromise('4')).to.strictlyEqual(false);
      expect(t.isPromise(4)).to.strictlyEqual(false);
      expect(t.isPromise(true)).to.strictlyEqual(false);
      expect(t.isPromise(undefined)).to.strictlyEqual(false);
      expect(t.isPromise(null)).to.strictlyEqual(false);
      expect(t.isPromise({ length: 0 })).to.strictlyEqual(false);
      // eslint-disable-next-line no-empty-function
      expect(t.isPromise(() => {})).to.strictlyEqual(false);
      expect(t.isPromise(new PromiseLikeClass())).to.strictlyEqual(false);
   });

});
