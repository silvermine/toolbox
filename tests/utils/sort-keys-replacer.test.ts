import { expect } from 'chai';
import { sortKeysReplacer } from '../../src/index';


describe('sortKeysReplacer', () => {

   it('sorts top-level object keys lexicographically', () => {
      const obj = { z: 1, a: 2, m: 3 };

      expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":2,"m":3,"z":1}');
   });

   it('recursively sorts nested object keys', () => {
      const obj = { z: { c: 1, a: 2 }, a: { z: 3, b: 4 } };

      expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":{"b":4,"z":3},"z":{"a":2,"c":1}}');
   });

   it('does not reorder array elements', () => {
      const obj = { arr: [ 3, 1, 2 ] };

      expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"arr":[3,1,2]}');
   });

   it('sorts keys of objects inside arrays', () => {
      const obj = { arr: [ { z: 1, a: 2 }, { m: 3, b: 4 } ] };

      expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"arr":[{"a":2,"z":1},{"b":4,"m":3}]}');
   });

   it('handles primitive values', () => {
      expect(JSON.stringify('string', sortKeysReplacer)).to.strictlyEqual('"string"');
      expect(JSON.stringify(123, sortKeysReplacer)).to.strictlyEqual('123');
      expect(JSON.stringify(true, sortKeysReplacer)).to.strictlyEqual('true');
      expect(JSON.stringify(null, sortKeysReplacer)).to.strictlyEqual('null');
   });

   it('handles null values in objects', () => {
      const obj = { z: null, m: 1 };

      expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"m":1,"z":null}');
   });

   it('handles empty objects', () => {
      expect(JSON.stringify({}, sortKeysReplacer)).to.strictlyEqual('{}');
   });

   it('handles deeply nested structures', () => {
      const obj = {
         z: {
            y: {
               x: { b: 1, a: 2 },
            },
         },
         a: 'first',
      };

      expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":"first","z":{"y":{"x":{"a":2,"b":1}}}}');
   });

   describe('lexicographical sorting behavior', () => {

      it('sorts integer-like keys numerically due to JS object key ordering', () => {
         const obj = { '10': 'ten', '2': 'two', '1': 'one', '20': 'twenty' };

         expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"1":"one","2":"two","10":"ten","20":"twenty"}');
         // JS engines automatically sort integer-like keys numerically before other keys
         // so even though the original object was declared in a different order, the
         // sorted result is the same.
         expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(obj));
      });

      it('sorts mixed alphanumeric keys lexicographically (number suffix)', () => {
         const obj = { 'a2': 1, 'a10': 2, 'a1': 3, 'b1': 4 };

         expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a1":3,"a10":2,"a2":1,"b1":4}');
      });

      it('sorts mixed alphanumeric keys lexicographically (number prefix)', () => {
         const obj = { '2a': 1, '10a': 2, '1a': 3, '1b': 4 };

         // '10a' < '1a' < '1b' < '2a' (lexicographic: '0' < 'a' < 'b')
         expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"10a":2,"1a":3,"1b":4,"2a":1}');
      });

      it('sorts uppercase before lowercase (ASCII order)', () => {
         const obj = { 'b': 1, 'A': 2, 'a': 3, 'B': 4 };

         // Uppercase letters (65-90) come before lowercase (97-122) in UTF-16
         expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"A":2,"B":4,"a":3,"b":1}');
      });

      it('sorts non-Roman characters by UTF-16 code point', () => {
         const obj = { 'ä': 1, 'a': 2, 'z': 3, 'α': 4, '日': 5 };

         // a(97) < z(122) < ä(228) < α(945) < 日(26085)
         expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":2,"z":3,"ä":1,"α":4,"日":5}');
      });

      it('sorts emoji keys by UTF-16 code point', () => {
         const obj = { '🍎': 'apple', '🍊': 'orange', 'a': 'letter' };

         // 'a' (97) comes before emojis (high code points)
         expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":"letter","🍊":"orange","🍎":"apple"}');
      });

   });

   describe('non-serializable values', () => {

      describe('undefined values', () => {

         it('sorts keys and omits undefined values', () => {
            const obj = { z: undefined, a: 1 };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":1}');
         });

         it('matches native JSON.stringify with presorted keys', () => {
            const obj = { a: 1, z: undefined };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(obj));
         });

      });

      describe('function values', () => {

         it('sorts keys and omits function values', () => {
            const obj = { z: () => { /* noop */ }, a: 1, b: function() { /* noop */ } };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":1}');
         });

         it('matches native JSON.stringify with presorted keys', () => {
            const obj = { a: 1, b: function() { /* noop */ }, z: () => { /* noop */ } };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(obj));
         });

      });

      describe('Symbol-keyed properties', () => {

         it('sorts keys and omits Symbol-keyed properties', () => {
            const obj = { [Symbol('test')]: 'symbol-value', z: 2, a: 1 };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":1,"z":2}');
         });

         it('matches native JSON.stringify with presorted keys', () => {
            const obj = { [Symbol('test')]: 'symbol-value', a: 1, z: 2 };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(obj));
         });

      });

      describe('Symbol values in arrays', () => {

         it('converts Symbol values to null in arrays', () => {
            const obj = { arr: [ Symbol('test'), 1, 2 ] };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"arr":[null,1,2]}');
         });

         it('matches native JSON.stringify with presorted keys', () => {
            const obj = { arr: [ Symbol('test'), 1, 2 ] };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(obj));
         });

      });

      describe('Symbol values in objects', () => {

         it('sorts keys and omits Symbol values', () => {
            const obj = { z: Symbol('test'), a: 1 };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":1}');
         });

         it('matches native JSON.stringify with presorted keys', () => {
            const obj = { a: 1, z: Symbol('test') };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(obj));
         });

      });

   });

   describe('class instances and special objects', () => {

      describe('class instances', () => {

         it('sorts keys of class instances', () => {
            class TestClass {
               public z: number = 1;
               public a: number = 2;
            }
            const instance = new TestClass();

            expect(JSON.stringify(instance, sortKeysReplacer)).to.strictlyEqual('{"a":2,"z":1}');
         });

         it('matches native JSON.stringify with presorted keys', () => {
            class TestClass {
               public a: number = 2;
               public z: number = 1;
            }
            const instance = new TestClass();

            expect(JSON.stringify(instance, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(instance));
         });

      });

      describe('class instances with methods', () => {

         it('sorts keys and omits methods', () => {
            class TestClass {
               public z: number = 1;
               public a: number = 2;
               public method(): void { /* noop */ }
            }
            const instance = new TestClass();

            expect(JSON.stringify(instance, sortKeysReplacer)).to.strictlyEqual('{"a":2,"z":1}');
         });

         it('matches native JSON.stringify with presorted keys', () => {
            class TestClass {
               public a: number = 2;
               public z: number = 1;
               public method(): void { /* noop */ }
            }
            const instance = new TestClass();

            expect(JSON.stringify(instance, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(instance));
         });

      });

      describe('Date objects', () => {

         it('sorts keys and serializes Date as ISO string', () => {
            const obj = { z: new Date('2024-01-15T12:00:00.000Z'), a: 1 };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":1,"z":"2024-01-15T12:00:00.000Z"}');
         });

         it('matches native JSON.stringify with presorted keys', () => {
            const obj = { a: 1, z: new Date('2024-01-15T12:00:00.000Z') };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(obj));
         });

      });

      describe('RegExp', () => {

         it('sorts keys and serializes RegExp as empty object', () => {
            const obj = { z: /test/g, a: 1 };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":1,"z":{}}');
         });

         it('matches native JSON.stringify with presorted keys', () => {
            const obj = { a: 1, z: /test/g };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(obj));
         });

      });

      describe('Map', () => {

         it('sorts keys and serializes Map as empty object', () => {
            const obj = { z: new Map([ [ 'key', 'value' ] ]), a: 1 };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":1,"z":{}}');
         });

         it('matches native JSON.stringify with presorted keys', () => {
            const obj = { a: 1, z: new Map([ [ 'key', 'value' ] ]) };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(obj));
         });

      });

      describe('Set', () => {

         it('sorts keys and serializes Set as empty object', () => {
            const obj = { z: new Set([ 1, 2, 3 ]), a: 1 };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":1,"z":{}}');
         });

         it('matches native JSON.stringify with presorted keys', () => {
            const obj = { a: 1, z: new Set([ 1, 2, 3 ]) };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(obj));
         });

      });

   });

   describe('edge cases', () => {

      it('handles objects with inherited properties (only own properties)', () => {
         const proto = { inherited: 'value' },
               obj = Object.create(proto);

         obj.z = 1;
         obj.a = 2;

         expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":2,"z":1}');
      });

      it('handles empty arrays', () => {
         expect(JSON.stringify([], sortKeysReplacer)).to.strictlyEqual('[]');
      });

      it('handles nested empty structures', () => {
         const obj = { z: {}, a: [], m: { nested: {} } };

         expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":[],"m":{"nested":{}},"z":{}}');
      });

      describe('NaN and Infinity', () => {

         it('sorts keys and converts NaN/Infinity to null', () => {
            const obj = { z: NaN, a: Infinity, b: -Infinity };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual('{"a":null,"b":null,"z":null}');
         });

         it('matches native JSON.stringify with presorted keys', () => {
            const obj = { a: Infinity, b: -Infinity, z: NaN };

            expect(JSON.stringify(obj, sortKeysReplacer)).to.strictlyEqual(JSON.stringify(obj));
         });

      });

      describe('BigInt', () => {

         it('throws TypeError when sorting object with BigInt', () => {
            const obj = { z: BigInt(123), a: 1 };

            expect(() => { return JSON.stringify(obj, sortKeysReplacer); }).to.throw(TypeError);
         });

         it('matches native JSON.stringify (both throw TypeError)', () => {
            const obj = { a: 1, z: BigInt(123) };

            expect(() => { return JSON.stringify(obj); }).to.throw(TypeError);
            expect(() => { return JSON.stringify(obj, sortKeysReplacer); }).to.throw(TypeError);
         });

      });

      describe('circular references', () => {

         it('throws stack overflow RangeError for circular references (stack overflow)', () => {
            const obj: Record<string, unknown> = { a: 1 };

            obj.self = obj;

            // This is different from native JSON.stringify, which throws a TypeError
            expect(() => { return JSON.stringify(obj, sortKeysReplacer); }).to.throw(RangeError);
         });

      });

   });

});
