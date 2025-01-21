import { expect } from 'chai';
import { PropsWithType } from '../../src/index';
import { isUndefined } from 'util';

describe('PropsWithType', () => {

   // NOTE These tests do not really check much at runtime. The real value is in the type
   // checking that happens by *using* the `PropsWithType` type in this test. If we break
   // the definition of `PropsWithType` so that it no longer selects the correct
   // properties, the TypeScript compiler will complain about this test.

   it('allows property keys that have a given type', () => {
      interface TestType {
         readonly prop: string;
         readonly anotherProp: number;
         readonly additionalProp: number;
      }

      function getNumber(from: TestType, field: PropsWithType<TestType, number>): number {
         // `field` will only be allowed to be `anotherProp` or `additionalProp`
         return from[field];
      }

      const obj: TestType = { prop: 'test', anotherProp: 1, additionalProp: 2 };

      expect(getNumber(obj, 'anotherProp')).to.strictlyEqual(1);
      expect(getNumber(obj, 'additionalProp')).to.strictlyEqual(2);
   });

   it('correctly defines types for types that have optional params', () => {
      interface TestType {
         readonly prop: string;
         readonly anotherProp: number;
         readonly additionalProp?: number;
      }

      function getNumber(from: TestType, field: PropsWithType<TestType, number | undefined>): number {
         // `field` will only be allowed to be `anotherProp` or `additionalProp`. Should
         // note that `from[field]` is `number | undefined`.
         const val = from[field];

         return isUndefined(val) ? 0 : val;
      }

      const obj: TestType = { prop: 'test', anotherProp: 1, additionalProp: 2 };

      expect(getNumber(obj, 'anotherProp')).to.strictlyEqual(1);
      expect(getNumber(obj, 'additionalProp')).to.strictlyEqual(2);

      // NOTE: leaving the following cases commented out as we don't have an automated way
      // to test types. This package cannot ship with these uncommented as they report the
      // error "X is declared but never used.ts(6196)".

      // Should be: "prop"
      // type onlyStrings = PropsWithType<TestType, string>;

      // Should be: "anotherProp"
      // type onlyNumbers = PropsWithType<TestType, number>;

      // Should be: "anotherProp" | "additionalProp"
      // type numbersOrUndefineds = PropsWithType<TestType, number | undefined>;

      // Should be: never
      // type undefineds = PropsWithType<TestType, undefined>;

      // Should be: never
      // type booleans = PropsWithType<TestType, boolean>;
   });

});
