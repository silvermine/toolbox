import { expect } from 'chai';
import { RequireOptional, StrictUnion } from '../../src/index';
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

   it('works with generics', () => {
      function fnWithGeneric<T extends { prop: string; optionalProp?: string }>(item: T): boolean {
         return hasDefined(item, 'optionalProp') || hasDefined(item, 'prop');
      }

      expect(fnWithGeneric({ prop: 'test', optionalProp: 'test' })).to.strictlyEqual(true);
      expect(fnWithGeneric({ prop: 'test' })).to.strictlyEqual(true);
   });

   describe('runtime behavior', () => {

      it('returns true when optional property is defined', () => {
         const obj: TestType = {
            optString: 'test',
            reqString: 'a',
            stringOrUndefined: 'b',
            reqNumber: 1,
            reqBoolean: true,
         };

         expect(hasDefined(obj, 'optString')).to.strictlyEqual(true);
      });

      it('returns false when optional property is undefined', () => {
         const obj: TestType = {
            optString: undefined,
            reqString: 'a',
            stringOrUndefined: 'b',
            reqNumber: 1,
            reqBoolean: true,
         };

         expect(hasDefined(obj, 'optString')).to.strictlyEqual(false);
      });

      it('returns false when optional property is missing', () => {
         const obj: TestType = {
            reqString: 'a',
            stringOrUndefined: 'b',
            reqNumber: 1,
            reqBoolean: true,
         };

         expect(hasDefined(obj, 'optString')).to.strictlyEqual(false);
      });

      it('returns false when property with union type is undefined', () => {
         const obj: TestType = {
            reqString: 'a',
            stringOrUndefined: undefined,
            reqNumber: 1,
            reqBoolean: true,
         };

         expect(hasDefined(obj, 'stringOrUndefined')).to.strictlyEqual(false);
      });

      it('returns true when required property is defined', () => {
         const obj: TestType = {
            reqString: 'a',
            stringOrUndefined: 'b',
            reqNumber: 1,
            reqBoolean: true,
         };

         expect(hasDefined(obj, 'reqString')).to.strictlyEqual(true);
      });


      it('returns true for falsy values that are not undefined', () => {
         interface FalsyType {
            optZero?: number;
            optFalse?: boolean;
            optEmptyString?: string;
         }

         const obj: FalsyType = {
            optZero: 0,
            optFalse: false,
            optEmptyString: '',
         };

         expect(hasDefined(obj, 'optZero')).to.strictlyEqual(true);
         expect(hasDefined(obj, 'optFalse')).to.strictlyEqual(true);
         expect(hasDefined(obj, 'optEmptyString')).to.strictlyEqual(true);
      });

      it('returns true for null values', () => {
         interface NullableType {
            optValue?: string | null;
         }

         const obj: NullableType = {
            optValue: null,
         };

         // Note: hasDefined checks for undefined, not null, so this returns true
         expect(hasDefined(obj, 'optValue')).to.strictlyEqual(true);
      });

      describe('multiple property checks', () => {

         it('can chain multiple hasDefined checks', () => {
            const obj: TestType = {
               optString: 'test',
               optNumber: 42,
               optBoolean: true,
               reqString: 'a',
               stringOrUndefined: 'b',
               reqNumber: 1,
               reqBoolean: true,
            };

            const allDefined = hasDefined(obj, 'optString')
               && hasDefined(obj, 'optNumber')
               && hasDefined(obj, 'optBoolean');

            expect(allDefined).to.strictlyEqual(true);
         });

         it('returns false when any property in chain is undefined', () => {
            const obj: TestType = {
               optString: 'test',
               optNumber: undefined,
               reqString: 'a',
               stringOrUndefined: 'b',
               reqNumber: 1,
               reqBoolean: true,
            };

            const allDefined = hasDefined(obj, 'optString')
               && hasDefined(obj, 'optNumber')
               && hasDefined(obj, 'optBoolean');

            expect(allDefined).to.strictlyEqual(false);
         });

      });

   });

   describe('StrictUnion types', () => {

      type StrictUnionType = StrictUnion<
         { name: string }
         | { firstName: string; lastName: string }
         | { groupName: string }
         | { groupName: string; name: string }
      >;

      // Typescript is being too smart with the const's below and inferring the type as
      // the const value instead of the union type. This function ensures we're testing
      // against the union.
      function testValue(obj: StrictUnionType): StrictUnionType {
         return obj;
      }

      it('works with property present in single union member', () => {
         const obj = testValue({ firstName: 'John', lastName: 'Doe' });

         expect(hasDefined(obj, 'firstName')).to.strictlyEqual(true);
         expect(hasDefined(obj, 'lastName')).to.strictlyEqual(true);
      });

      it('returns false when checking for property not in current member', () => {
         const obj = testValue({ name: 'John Doe' });

         expect(hasDefined(obj, 'firstName')).to.strictlyEqual(false);
         expect(hasDefined(obj, 'groupName')).to.strictlyEqual(false);
      });

      it('works with property present in multiple union members', () => {
         const obj1 = testValue({ name: 'John' }),
               obj2 = testValue({ groupName: 'Team A', name: 'Project X' });

         expect(hasDefined(obj1, 'name')).to.strictlyEqual(true);
         expect(hasDefined(obj2, 'name')).to.strictlyEqual(true);
         expect(hasDefined(obj2, 'groupName')).to.strictlyEqual(true);
      });

      it('narrows type when checking properties', () => {
         function processWithFirstName(obj: { firstName: string; lastName: string }): string {
            return `${obj.firstName} ${obj.lastName}`;
         }

         function handleObject(obj: StrictUnionType): void {
            if (hasDefined(obj, 'firstName') && hasDefined(obj, 'lastName')) {
               processWithFirstName(obj);
            }
         }

         const obj = testValue({ firstName: 'Jane', lastName: 'Smith' });

         handleObject(obj);
      });

      it('handles union member with single property', () => {
         const obj = testValue({ groupName: 'Engineering' });

         expect(hasDefined(obj, 'groupName')).to.strictlyEqual(true);
         expect(hasDefined(obj, 'name')).to.strictlyEqual(false);
      });

      it('distinguishes between union members by property presence', () => {
         const objects: StrictUnionType[] = [
            { name: 'Alice' },
            { firstName: 'Bob', lastName: 'Jones' },
            { groupName: 'Team B' },
            { groupName: 'Team C', name: 'Project Y' },
         ];

         const withName = objects.filter((obj) => {
            return hasDefined(obj, 'name');
         });

         const withFirstName = objects.filter((obj) => {
            return hasDefined(obj, 'firstName');
         });

         expect(withName).to.have.lengthOf(2);
         expect(withFirstName).to.have.lengthOf(1);
      });

      it('works when union member has overlapping properties', () => {
         const obj = testValue({ groupName: 'Team D', name: 'Project Z' });

         const hasBoth = hasDefined(obj, 'groupName') && hasDefined(obj, 'name');

         expect(hasBoth).to.strictlyEqual(true);
         expect(hasDefined(obj, 'firstName')).to.strictlyEqual(false);
      });

   });

   describe('discriminated union types', () => {

      type Shape = Circle | Square | Triangle;

      interface Circle {
         kind: 'circle';
         radius: number;
         color?: string;
      }

      interface Square {
         kind: 'square';
         sideLength: number;
         color?: string;
         border?: string;
      }

      interface Triangle {
         kind: 'triangle';
         base: number;
         height: number;
         color?: string;
      }

      it('works with optional properties on discriminated union members', () => {
         const circle: Circle = {
            kind: 'circle',
            radius: 10,
            color: 'red',
         };

         expect(hasDefined(circle, 'color')).to.strictlyEqual(true);
      });

      it('returns false when optional property is missing on union member', () => {
         const circle: Circle = {
            kind: 'circle',
            radius: 10,
         };

         expect(hasDefined(circle, 'color')).to.strictlyEqual(false);
      });

      it('narrows type correctly when checking discriminated union', () => {
         function processSquare(shape: RequireDefined<Square, 'border'>): string {
            return `Square with ${shape.border} border`;
         }

         function handleShape(shape: Shape): void {
            if (hasDefined(shape, 'border')) {
               // Type is now narrowed to Square with border defined
               processSquare(shape);
            }
         }

         const square: Square = {
            kind: 'square',
            sideLength: 5,
            border: 'solid',
         };

         handleShape(square);
      });

      it('works with multiple optional properties on same union member', () => {
         const square: Square = {
            kind: 'square',
            sideLength: 5,
            color: 'blue',
            border: 'dashed',
         };

         const hasBoth = hasDefined(square, 'color') && hasDefined(square, 'border');

         expect(hasBoth).to.strictlyEqual(true);
      });

      it('handles shapes with only some optional properties defined', () => {
         const square: Square = {
            kind: 'square',
            sideLength: 5,
            color: 'blue',
         };

         expect(hasDefined(square, 'color')).to.strictlyEqual(true);
         expect(hasDefined(square, 'border')).to.strictlyEqual(false);
      });

      it('works when processing different union members', () => {
         const shapes: Shape[] = [
            { kind: 'circle', radius: 10, color: 'red' },
            { kind: 'square', sideLength: 5 },
            { kind: 'triangle', base: 4, height: 3, color: 'green' },
         ];

         const coloredShapes = shapes.filter((shape) => {
            return hasDefined(shape, 'color');
         });

         expect(coloredShapes).to.have.lengthOf(2);
      });

   });

   describe('non-discriminated union types', () => {

      type UndiscriminatedUnion = { name: string }
         | { firstName: string; lastName: string }
         | { groupName: string }
         | { groupName: string; name: string };

      // Typescript is being too smart with the const's below and inferring the type as
      // the const value instead of the union type. This function ensures we're testing
      // against the union.
      function testValue(obj: UndiscriminatedUnion): UndiscriminatedUnion {
         return obj;
      }

      it('works with property present in single union member', () => {
         const obj = testValue({ firstName: 'John', lastName: 'Doe' });

         expect(hasDefined(obj, 'firstName')).to.strictlyEqual(true);
         expect(hasDefined(obj, 'lastName')).to.strictlyEqual(true);
      });

      it('returns false when checking for property not in current member', () => {
         const obj = testValue({ name: 'John Doe' });

         expect(hasDefined(obj, 'firstName')).to.strictlyEqual(false);
         expect(hasDefined(obj, 'groupName')).to.strictlyEqual(false);
      });

      it('works with property present in multiple union members', () => {
         const obj1 = testValue({ name: 'John' }),
               obj2 = testValue({ groupName: 'Team A', name: 'Project X' });

         expect(hasDefined(obj1, 'name')).to.strictlyEqual(true);
         expect(hasDefined(obj2, 'name')).to.strictlyEqual(true);
         expect(hasDefined(obj2, 'groupName')).to.strictlyEqual(true);
      });

      it('narrows type when checking properties', () => {
         function processWithFirstName(obj: { firstName: string; lastName: string }): string {
            return `${obj.firstName} ${obj.lastName}`;
         }

         function handleObject(obj: UndiscriminatedUnion): void {
            if (hasDefined(obj, 'firstName') && hasDefined(obj, 'lastName')) {
               processWithFirstName(obj);
            }
         }

         const obj = testValue({ firstName: 'Jane', lastName: 'Smith' });

         handleObject(obj);
      });

      it('handles union member with single property', () => {
         const obj = testValue({ groupName: 'Engineering' });

         expect(hasDefined(obj, 'groupName')).to.strictlyEqual(true);
         expect(hasDefined(obj, 'name')).to.strictlyEqual(false);
      });

      it('distinguishes between union members by property presence', () => {
         const objects: UndiscriminatedUnion[] = [
            { name: 'Alice' },
            { firstName: 'Bob', lastName: 'Jones' },
            { groupName: 'Team B' },
            { groupName: 'Team C', name: 'Project Y' },
         ];

         const withName = objects.filter((obj) => {
            return hasDefined(obj, 'name');
         });

         const withFirstName = objects.filter((obj) => {
            return hasDefined(obj, 'firstName');
         });

         expect(withName).to.have.lengthOf(2);
         expect(withFirstName).to.have.lengthOf(1);
      });

      it('works when union member has overlapping properties', () => {
         const obj = testValue({ groupName: 'Team D', name: 'Project Z' });

         const hasBoth = hasDefined(obj, 'groupName') && hasDefined(obj, 'name');

         expect(hasBoth).to.strictlyEqual(true);
         expect(hasDefined(obj, 'firstName')).to.strictlyEqual(false);
      });

   });

});
