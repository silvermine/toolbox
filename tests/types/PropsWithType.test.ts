import { expect } from 'chai';
import { PropsWithType } from '../../src/index';

describe('PropsWithType', () => {

   // NOTE This test does not really check much at runtime. The real value is in the type
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

      let obj: TestType = { prop: 'test', anotherProp: 1, additionalProp: 2 };

      expect(getNumber(obj, 'anotherProp')).to.strictlyEqual(1);
      expect(getNumber(obj, 'additionalProp')).to.strictlyEqual(2);
   });

});
