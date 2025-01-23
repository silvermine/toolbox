import { expect } from 'chai';
import * as t from '../../src/index';


describe('isArguments', () => {

   it('correctly classifies arguments', () => {
      // Must include this test inside of an anonymous `function` because arrow functions
      // do not have `arguments`.
      (function() {
         // eslint-disable-next-line prefer-rest-params
         expect(t.isArguments(arguments)).to.strictlyEqual(true);
      }());
   });

   it('correctly classifies non-arguments', () => {
      (function(...args: unknown[]) {
         expect(t.isArguments(args)).to.strictlyEqual(false);
      }());


      (function(arr: unknown[]): void {
         expect(t.isArguments(arr)).to.strictlyEqual(false);
      }([]));

      expect(t.isArguments([])).to.strictlyEqual(false);
      expect(t.isArguments({})).to.strictlyEqual(false);
      expect(t.isArguments(4)).to.strictlyEqual(false);
      expect(t.isArguments('')).to.strictlyEqual(false);
      expect(t.isArguments('a')).to.strictlyEqual(false);
      expect(t.isArguments(true)).to.strictlyEqual(false);
      expect(t.isArguments(undefined)).to.strictlyEqual(false);
      expect(t.isArguments(null)).to.strictlyEqual(false);
      expect(t.isArguments({ length: 0 })).to.strictlyEqual(false);
      // eslint-disable-next-line no-empty-function
      expect(t.isArguments(() => {})).to.strictlyEqual(false);
   });

});
