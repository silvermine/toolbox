import { expect } from 'chai';
import { RequireOptional } from '../../src/index';
import { hasDefined } from '../../src/utils/has-defined';
import { RequireDefined } from '../../src/types/RequireDefined';

describe('hasDefined', () => {

   interface TestType {
      optString?: string;
      optNumber?: number;
      optBoolean?: boolean;
      stringOrUndefined: string | undefined;
      reqString: string;
      reqNumber: number;
      reqBoolean: boolean;
   }

   // NOTE These tests do not really check much at runtime. The real value is in the type
   // checking that happens by *using* the `RequireOptional` type and `hasDefined` in this
   // test. If we break the definition of `RequireOptional` so that it no longer selects
   // the correct properties, or the type safety the hasDefined typeguard provides, the
   // TypeScript compiler will complain about this test.

   it('requires the specified optional property', () => {
      function requireStringAndNumber(o: RequireOptional<TestType, 'optString' | 'optNumber'>): void {
         // really, the tests here aren't the expectations, but the fact that we can call
         // methods on the string and number without checking that they're required
         expect(o.optString.toLowerCase()).to.strictlyEqual('test');
         expect(o.optNumber.toFixed(2)).to.strictlyEqual('42.00');
      }

      function callOtherFunction(input: TestType): void {
         // This is really the test. If hasDefined didn't provide the type safety needed
         // for RequireOptional, the `requireStringAndNumber(input);` line would not
         // compile.
         if (hasDefined(input, 'optString') && hasDefined(input, 'optNumber')) {
            requireStringAndNumber(input);
         }
      }

      const t = {
         optString: 'TEST',
         optNumber: 42,
         reqString: 'a',
         stringOrUndefined: 'next test',
         reqNumber: 1,
         reqBoolean: true,
      };

      callOtherFunction(t);
   });

   it('works when type uses `foo: type | undefined`', () => {
      function requireStringAndNumber(o: RequireDefined<TestType, 'stringOrUndefined' | 'optNumber'>): void {
         // really, the tests here aren't the expectations, but the fact that we can call
         // methods on the string and number without checking that they're required
         expect(o.stringOrUndefined.toLowerCase()).to.strictlyEqual('test');
         expect(o.optNumber.toFixed(2)).to.strictlyEqual('42.00');
      }

      function callOtherFunction(input: TestType): void {
         // This is really the test. If hasDefined didn't provide the type safety needed
         // for RequireOptional, the `requireStringAndNumber(input);` line would not
         // compile.
         if (hasDefined(input, 'stringOrUndefined') && hasDefined(input, 'optNumber')) {
            requireStringAndNumber(input);
         }
      }

      const t = {
         optNumber: 42,
         reqString: 'a',
         stringOrUndefined: 'TEST',
         reqNumber: 1,
         reqBoolean: true,
      };

      callOtherFunction(t);
   });
});
