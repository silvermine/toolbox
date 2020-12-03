import { expect } from 'chai';
import * as t from '../../src/index';
import { isMapWithValuesOfType } from '../../src/index';


describe('isMapWithValuesOfType', () => {

   it('correctly classifies objects', () => {
      expect(t.isMapWithValuesOfType(t.isNumber, {})).to.strictlyEqual(true);
      expect(t.isMapWithValuesOfType(t.isNumber, { a: 0 })).to.strictlyEqual(true);
      expect(t.isMapWithValuesOfType(t.isNumber, { a: 0, b: 1 })).to.strictlyEqual(true);

      expect(t.isMapWithValuesOfType(t.isString, {})).to.strictlyEqual(true);
      expect(t.isMapWithValuesOfType(t.isString, { a: 'b' })).to.strictlyEqual(true);
      expect(t.isMapWithValuesOfType(t.isString, { a: 'b', c: 'd' })).to.strictlyEqual(true);

      expect(t.isMapWithValuesOfType(t.isArrayOfStrings, {})).to.strictlyEqual(true);
      expect(t.isMapWithValuesOfType(t.isArrayOfStrings, { a: [ 'b' ] })).to.strictlyEqual(true);
      expect(t.isMapWithValuesOfType(t.isArrayOfStrings, { a: [ 'b' ], c: [ 'd' ] })).to.strictlyEqual(true);
   });

   it('correctly classifies objects with values of wrong type', () => {
      expect(t.isMapWithValuesOfType(t.isNumber, { a: 'b' })).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isNumber, { a: 'b', c: 0 })).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isNumber, { a: 0, b: 'c' })).to.strictlyEqual(false);

      expect(t.isMapWithValuesOfType(t.isString, { a: 0 })).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isString, { a: 0, b: 'c' })).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isString, { a: 'b', c: 0 })).to.strictlyEqual(false);

      expect(t.isMapWithValuesOfType(t.isArrayOfStrings, { a: 'b' })).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isArrayOfStrings, { a: 'b', b: [ 'c' ] })).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isArrayOfStrings, { a: [ 'b' ], c: 'd' })).to.strictlyEqual(false);
   });

   // This test doesn't really provide much in the way of runtime tests, it's mainly here
   // to ensure the typing on the type guard is correct.
   it('provides correct type hinting', () => {
      const obj: unknown = { a: 'b', c: 'd' };

      if (isMapWithValuesOfType(t.isString, obj)) {
         obj.e = 'f';
         expect(obj.a.charAt(0)).to.strictlyEqual('b');
      } else {
         throw new Error('expected obj to be a Record<string, string>');
      }
   });

   it('correctly classifies non-objects', () => {
      expect(t.isMapWithValuesOfType(t.isNumber, [])).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isNumber, 4)).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isNumber, '')).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isNumber, 'a')).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isNumber, true)).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isNumber, undefined)).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isNumber, null)).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isString, [])).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isString, 4)).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isString, '')).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isString, 'a')).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isString, true)).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isString, undefined)).to.strictlyEqual(false);
      expect(t.isMapWithValuesOfType(t.isString, null)).to.strictlyEqual(false);
   });

});
