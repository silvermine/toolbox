import { expect } from 'chai';
import * as t from '../../src/index';


describe('isEmpty', () => {

   it('correctly classifies empty things', () => {
      expect(t.isEmpty([])).to.strictlyEqual(true);
      expect(t.isEmpty(new Set([]))).to.strictlyEqual(true);
      // eslint-disable-next-line
      expect(t.isEmpty(new Array())).to.strictlyEqual(true);
      expect(t.isEmpty({})).to.strictlyEqual(true);
      expect(t.isEmpty('')).to.strictlyEqual(true);
      // eslint-disable-next-line no-new-wrappers
      expect(t.isEmpty(new String(''))).to.strictlyEqual(true);
      expect(t.isEmpty(null)).to.strictlyEqual(true);
      expect(t.isEmpty(undefined)).to.strictlyEqual(true);
      // Boolean values are empty
      expect(t.isEmpty(true)).to.strictlyEqual(true);
      expect(t.isEmpty(false)).to.strictlyEqual(true);
      // Numbers are empty
      expect(t.isEmpty(0)).to.strictlyEqual(true);
      expect(t.isEmpty(4)).to.strictlyEqual(true);
      expect(t.isEmpty(3.14)).to.strictlyEqual(true);
      // Objects with prototype properties are considered empty
      // @see https://github.com/jashkenas/underscore/blob/d5fe0fd4060f13b40608cb9d92eda6d857e8752c/underscore.js#L1301
      expect(t.isEmpty(/(?:)/)).to.strictlyEqual(true);

      // eslint-disable-next-line no-empty-function
      expect(t.isEmpty(() => {})).to.strictlyEqual(true);

      // deleting all the keys from on object empties it
      const o: { a?: boolean } = { a: true };

      expect(t.isEmpty(o)).to.strictlyEqual(false);
      delete o.a;
      expect(t.isEmpty(o)).to.strictlyEqual(true);
   });

   it('correctly classifies non-empty things', () => {
      expect(t.isEmpty('test')).to.strictlyEqual(false);
      expect(t.isEmpty({ length: 0 })).to.strictlyEqual(false);
      expect(t.isEmpty([ 1 ])).to.strictlyEqual(false);
      expect(t.isEmpty(new Array(10))).to.strictlyEqual(false);
      expect(t.isEmpty(new Set([ 1 ]))).to.strictlyEqual(false);
   });

   it('keeps type information when checking for empty array', () => {
      const arr: string[] = [];

      if (t.isEmpty(arr)) {
         arr.push('test');
      }

      expect(arr.length).to.strictlyEqual(1);
   });

   it('keeps type information when checking for empty record', () => {
      const obj: Record<string, number> = {};

      if (t.isEmpty(obj)) {
         obj.test = 1;
      }

      expect(obj.test).to.strictlyEqual(1);
   });

   it('works as a type guard for strings', () => {
      const testFn = (val: string | undefined): void => {
         if (t.isEmpty(val)) {
            const undef: '' | undefined = val;

            expect(undef).to.strictlyEqual(undefined);
         } else {
            const str: string = val;

            expect(str).to.strictlyEqual('test');
         }
      };

      testFn(undefined);
      testFn('test');
   });

   it('works as a type guard', () => {
      const testFn = (val: { a: boolean } | undefined): void => {
         if (t.isEmpty(val)) {
            const undef: undefined = val;

            expect(undef).to.strictlyEqual(undefined);
         } else {
            const obj: { a: boolean } = val;

            expect(obj.a).to.strictlyEqual(true);
         }
      };

      testFn(undefined);
      testFn({ a: true });
   });

});
