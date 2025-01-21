import { expect } from 'chai';
import { pick } from '../../src';

interface Location {
   city: string;
   state: string;
}

interface Person {
   firstName: string;
   middleInitial?: string;
   lastName: string;
   age: number;
   location?: Location;
}

const JOHN_DOE: Person = { firstName: 'John', lastName: 'Doe', age: 21 },
      JANE_DOE: Person = { firstName: 'Jane', lastName: 'Doe', age: 22, location: { city: 'New York', state: 'NY' } };

const WILE_E_COYOTE: Person = {
   firstName: 'Wile',
   middleInitial: 'E',
   lastName: 'Coyote',
   age: 12,
   location: { city: 'Tucson', state: 'AZ' },
};

describe('pick', () => {

   it('doesn\'t modify the source object', () => {
      const orig = { firstName: 'John', lastName: 'Doe', age: 21 };

      expect(pick(orig, 'age')).to.eql({ age: 21 });
      expect(orig).to.eql({ firstName: 'John', lastName: 'Doe', age: 21 });
   });

   it('works correctly when passed an array of keys', () => {
      // Explicitly type the results so we can make sure that our types on pick are
      // implemented correctly.
      const onlyAge: Pick<Person, 'age'> = pick(JOHN_DOE, [ 'age' ]),
            firstNameAndAge: Pick<Person, 'firstName' | 'age'> = pick(JOHN_DOE, [ 'firstName', 'age' ]),
            requiredProps: Person = pick(WILE_E_COYOTE, [ 'firstName', 'lastName', 'age' ]),
            noProps = pick(JOHN_DOE);

      const oneRequiredOneUndefinedOneOptional: Pick<Person, 'firstName' | 'middleInitial' | 'location'> = pick(JANE_DOE, [
         'firstName',
         'middleInitial',
         'location',
      ]);

      expect(onlyAge).to.eql({ age: 21 });
      expect(firstNameAndAge).to.eql({ firstName: 'John', age: 21 });
      expect(requiredProps).to.eql({ firstName: 'Wile', lastName: 'Coyote', age: 12 });
      expect(noProps).to.eql({});
      expect(oneRequiredOneUndefinedOneOptional).to.eql({ firstName: 'Jane', location: { city: 'New York', state: 'NY' } });
   });

   it('works correctly when called using a variadic syntax', () => {
      // Explicitly type the results so we can make sure that our types on pick are
      // implemented correctly.
      const onlyAge: Pick<Person, 'age'> = pick(JOHN_DOE, 'age'),
            firstNameAndAge: Pick<Person, 'firstName' | 'age'> = pick(JOHN_DOE, 'firstName', 'age'),
            requiredProps: Person = pick(WILE_E_COYOTE, 'firstName', 'lastName', 'age'),
            noProps = pick(JOHN_DOE, []);

      const oneRequiredOneUndefinedOneOptional: Pick<Person, 'firstName' | 'middleInitial' | 'location'> = pick(
         JANE_DOE,
         'firstName',
         'middleInitial',
         'location'
      );

      expect(onlyAge).to.eql({ age: 21 });
      expect(firstNameAndAge).to.eql({ firstName: 'John', age: 21 });
      expect(requiredProps).to.eql({ firstName: 'Wile', lastName: 'Coyote', age: 12 });
      expect(noProps).to.eql({});
      expect(oneRequiredOneUndefinedOneOptional).to.eql({ firstName: 'Jane', location: { city: 'New York', state: 'NY' } });
   });

   it('picks properties set to undefined', () => {
      const obj: { undefinedVal?: string; unsetVal?: string } = { undefinedVal: undefined };

      expect(pick(obj, 'undefinedVal')).to.eql({ undefinedVal: undefined });
      expect(pick(obj, 'unsetVal')).to.eql({});
   });

   it('can pick functions from a class prototype', () => {
      class Sample {
         public testMethod(): void {}
      }

      expect(pick(new Sample(), 'testMethod')).to.eql({ testMethod: Sample.prototype.testMethod });
   });

   it('can pick properties from the object\'s prototype', () => {
      const objWithProto = { a: 1 } as { a: number; b: number };

      (objWithProto as any).__proto__ = { b: 2 }; // eslint-disable-line no-proto

      expect(objWithProto.b).to.strictlyEqual(2);
      expect(pick(objWithProto, 'b')).to.eql({ b: 2 });
   });

});
