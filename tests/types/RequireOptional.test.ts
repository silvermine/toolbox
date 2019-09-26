import { expect } from 'chai';
import { RequireOptional } from '../../src/index';

describe('RequireOptional', () => {

   interface TestType {
      optionalProp?: number;
      propOrUndefined: number | undefined;
      optionalPropOrUndefined?: number | undefined;
      optionalPropOrNull?: number | null;
      optionalPropUndefinedOrNull?: number | undefined | null;
      canary: number;
      canaryOptionalProp?: number;
      canaryPropOrUndefined: number | undefined;
      canaryOptionalPropOrUndefined?: number | undefined;
      canaryOptionalPropOrNull?: number | null | undefined;
   }

   // NOTE These tests do not really check much at runtime. The real value is in the type
   // checking that happens by *using* the `RequireOptional` type in this test. If we
   // break the definition of `RequireOptional` so that it no longer selects the correct
   // properties, the TypeScript compiler will complain about this test.

   it('requires the specified optional property', () => {

      const testRequireOptional: RequireOptional<TestType, 'optionalProp'> = {
         canary: 1,
         canaryPropOrUndefined: undefined,
         propOrUndefined: undefined,
         optionalProp: 1,
      };

      expect(testRequireOptional.optionalProp).to.strictlyEqual(1);

   });

   it('requires multiple specified optional properties', () => {
      const testRequireMultipleOptionals: RequireOptional<TestType, 'optionalProp' | 'optionalPropOrUndefined'> = {
         canary: 1,
         canaryPropOrUndefined: undefined,
         propOrUndefined: undefined,
         optionalProp: 1,
         optionalPropOrUndefined: 1,
      };

      expect(testRequireMultipleOptionals.optionalProp).to.strictlyEqual(1);
      expect(testRequireMultipleOptionals.optionalPropOrUndefined).to.strictlyEqual(1);
   });

   it('matches the behavior of Required for "Type | undefined" optional properties', () => {
      const testRequireOptionalWithUndefined: RequireOptional<TestType, 'propOrUndefined' | 'optionalPropOrUndefined'> = {
         canary: 1,
         canaryPropOrUndefined: undefined,
         // NOTE: While propOrUndefined allows undefined, it is not optional. As such
         // Required and RequireOptional will not remove the `undefined` for this
         // property.
         propOrUndefined: undefined,
         // NOTE: Required and RequireOptional exclude undefined for this property as part
         // of the "optional" removal, therefore this now only allows `number`.
         optionalPropOrUndefined: 1,
      };

      expect(testRequireOptionalWithUndefined.propOrUndefined).to.strictlyEqual(undefined);
      expect(testRequireOptionalWithUndefined.optionalPropOrUndefined).to.strictlyEqual(1);
   });

   it('properly handles optional properties of type "Type | null"', () => {
      const testRequireOptionalWithNull: RequireOptional<TestType, 'optionalPropOrNull' | 'optionalPropUndefinedOrNull'> = {
         canary: 1,
         canaryPropOrUndefined: undefined,
         propOrUndefined: undefined,
         optionalPropOrNull: null,
         optionalPropUndefinedOrNull: null,
      };

      expect(testRequireOptionalWithNull.optionalPropOrNull).to.strictlyEqual(null);
      expect(testRequireOptionalWithNull.optionalPropUndefinedOrNull).to.strictlyEqual(null);
   });

   // NOTE: leaving the following cases commented out as we don't have an automated way to
   // test types. This package cannot ship with these uncommented as they report the error
   // "X is declared but never used.ts(6196)".

   // Should be: TestType & { optionalProp: number }
   // eslint-disable-next-line max-len
   // type WithOptionalPropRequired = RequireOptional<TestType, "optionalProp">;

   // Should be: TestType & { propOrUndefined: number | undefined }
   // eslint-disable-next-line max-len
   // type WithPropOrUndefinedRequired = RequireOptional<TestType, "propOrUndefined">;

   // Should be: TestType & { propOrUndefined: number | null }
   // eslint-disable-next-line max-len
   // type WithOptionalPropOrNullRequired = RequireOptional<TestType, "optionalPropOrNull">;

   // Should be: TestType & { optionalPropOrUndefined: number }
   // eslint-disable-next-line max-len
   // type WithOptionalPropOrUndefinedRequired = RequireOptional<TestType, "optionalPropOrUndefined">;

   // Should be:
   // TestType & { optionalProp:number; optionalPropOrUndefined: number }
   // eslint-disable-next-line max-len
   // type WithMultiple = RequireOptional<TestType, "optionalProp" | "optionalPropOrUndefined">;

});
