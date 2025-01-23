import { expect } from 'chai';
import { get } from '../../src/index';


describe('get', () => {

   const testObj = {
      id: 123,
      person: {
         firstName: 'Marty',
         lastName: 'McFly',
         isHuman: true,
         friends: [ { firstName: 'Emmett', lastName: 'Brown', isHuman: true } ],
      },
      getFullName() {
         return 'Marty McFly';
      },
   };

   it('gets properties and sub-properties', () => {
      expect(get(testObj, 'id')).to.strictlyEqual(testObj.id);
      expect(get(testObj, 'person')).to.strictlyEqual(testObj.person);
      expect(get(testObj, 'person.firstName')).to.strictlyEqual(testObj.person.firstName);
      expect(get(testObj, 'person.friends[0].lastName')).to.strictlyEqual(testObj.person.friends[0].lastName);
      expect(get(testObj, 'person.friends[0].isHuman')).to.strictlyEqual(testObj.person.friends[0].isHuman);
      expect(get([ 1, 2, 3 ], 1)).to.strictlyEqual(2);
   });

   it('can handle key access syntax for objects', () => {
      expect(get(testObj, 'person[firstName]')).to.strictlyEqual(testObj.person.firstName);
      expect(get(testObj, 'person[friends][0].isHuman')).to.strictlyEqual(testObj.person.friends[0].isHuman);
   });

   it('should favor a key match over a path', () => {
      expect(get({ 'a.b': 1, 'a': { 'b': 2 } }, 'a.b')).to.strictlyEqual(1);
   });

   it('can handle an empty path', () => {
      expect(get({ '': 1, 'a': { 'b': 2 } }, '')).to.strictlyEqual(1);
   });

   it('should handle complex paths', () => {
      const obj = { 'a': { '-1.23': { '["b"]': { 'c': { '[\'d\']': { '\ne\n': { 'f': { 'g': 8 } } } } } } } };

      const paths = [
         'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
         [ 'a', '-1.23', '["b"]', 'c', '[\'d\']', '\ne\n', 'f', 'g' ],
      ];

      paths.forEach((path) => {
         expect(get(obj, path)).to.strictlyEqual(8);
      });

      expect(get({ '': { 'test': { prop: true } } }, '.test.prop')).to.strictlyEqual(true);
   });

   it('handles keys other than strings', () => {
      expect(get({ 'null': true }, null as unknown as string)).to.strictlyEqual(true);
      expect(get({ 'undefined': true }, undefined as unknown as string)).to.strictlyEqual(true);
      expect(get({ [0]: true }, 0)).to.strictlyEqual(true);
      expect(get({ '-0': true }, -0)).to.strictlyEqual(true);
      expect(get({ 'true': true }, true)).to.strictlyEqual(true);
      expect(get({ [Symbol.for('TEST')]: true }, Symbol.for('TEST'))).to.strictlyEqual(true);
   });

   it('accepts arrays of keys', () => {
      const result = get({ people: [ testObj ] }, [ 'people', 0, 'person', 'lastName' ]);

      expect(result).to.not.strictlyEqual(undefined);
      expect(result).to.strictlyEqual(testObj.person.lastName);
   });

   it('returns undefined for keys that don\'t exist', () => {
      expect(get(testObj, 'DNE')).to.strictlyEqual(undefined);
      expect(get(100 as unknown as object, 'DNE')).to.strictlyEqual(undefined);
      expect(get([] as unknown as object, 'DNE')).to.strictlyEqual(undefined);
      expect(get(true as unknown as object, 'DNE')).to.strictlyEqual(undefined);
      expect(get({}, 'DNE')).to.strictlyEqual(undefined);
   });

   it('returns undefined when the object parameter is null or undefined', () => {
      expect(get(undefined as unknown as object, 'DNE')).to.strictlyEqual(undefined);
      expect(get(null as unknown as object, 'DNE')).to.strictlyEqual(undefined);
   });

   it('returns the default value for undefined values', () => {
      expect(get(testObj, 'id2', 100)).to.strictlyEqual(100);
      expect(get(testObj, 'person.DNE', true)).to.strictlyEqual(true);
      // null is not undefined, so `get` should return null
      expect(get({ name: null }, 'name')).to.strictlyEqual(null);
   });

});
