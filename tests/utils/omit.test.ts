import { expect } from 'chai';
import { omit } from '../../src';

interface Person {
   firstName: string;
   middleInitial?: string;
   lastName: string;
   age: number;
}

const WILE_E_COYOTE: Person = { firstName: 'Wile', middleInitial: 'E', lastName: 'Coyote', age: 12 };

describe('omit', () => {

   it('doesn\'t modify the source object', () => {
      const orig = { firstName: 'John', lastName: 'Doe', age: 21 };

      expect(omit(orig, 'age')).to.eql({ firstName: 'John', lastName: 'Doe' });
      expect(orig).to.eql({ firstName: 'John', lastName: 'Doe', age: 21 });
   });

   it('works correctly when passed an array of keys', () => {
      // Explicitly type the results so the compiler checks the types on omit.
      const withoutAge: Omit<Person, 'age'> = omit(WILE_E_COYOTE, [ 'age' ]),
            onlyLastName: Pick<Person, 'lastName'> = omit(WILE_E_COYOTE, [ 'firstName', 'middleInitial', 'age' ]),
            allProps: Person = omit(WILE_E_COYOTE, []);

      expect(withoutAge).to.eql({ firstName: 'Wile', middleInitial: 'E', lastName: 'Coyote' });
      expect(onlyLastName).to.eql({ lastName: 'Coyote' });
      expect(allProps).to.eql(WILE_E_COYOTE);
   });

   it('works correctly when called using a variadic syntax', () => {
      const withoutAge: Omit<Person, 'age'> = omit(WILE_E_COYOTE, 'age'),
            onlyLastName: Pick<Person, 'lastName'> = omit(WILE_E_COYOTE, 'firstName', 'middleInitial', 'age'),
            allProps: Person = omit(WILE_E_COYOTE);

      expect(withoutAge).to.eql({ firstName: 'Wile', middleInitial: 'E', lastName: 'Coyote' });
      expect(onlyLastName).to.eql({ lastName: 'Coyote' });
      expect(allProps).to.eql(WILE_E_COYOTE);
   });

   it('omits numeric keys', () => {
      expect(omit({ 1: 'a', 2: 'b' }, 1)).to.eql({ 2: 'b' });
   });

   it('copies enumerable properties from the object\'s prototype', () => {
      const objWithProto = { a: 1 } as { a: number; b: number; c: number };

      Object.setPrototypeOf(objWithProto, { b: 2, c: 3 });

      expect(omit(objWithProto, 'c')).to.eql({ a: 1, b: 2 });
   });

   it('copies an own __proto__ key without replacing the result\'s prototype', () => {
      const src = JSON.parse('{"__proto__":{"isAdmin":true},"a":1}'),
            result = omit(src, 'a');

      expect(Object.getPrototypeOf(result)).to.strictlyEqual(Object.prototype);
      expect(Object.keys(result)).to.eql([ '__proto__' ]);
      expect(result).to.not.have.property('isAdmin');
   });

   it('rejects keys the object does not have', () => {
      // @ts-expect-error 'b' is not a key of the object
      expect(omit({ a: 1 }, 'b')).to.eql({ a: 1 });
   });

});
