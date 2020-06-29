import { expect } from 'chai';
import { pluck } from '../../src';

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

const PEOPLE: Person[] = [
   { firstName: 'John', lastName: 'Doe', age: 21 },
   { firstName: 'Jane', lastName: 'Doe', age: 22, location: { city: 'New York', state: 'NY' } },
   { firstName: 'Wile', middleInitial: 'E', lastName: 'Coyote', age: 12, location: { city: 'Tucson', state: 'AZ' } },
   { firstName: 'Road', lastName: 'Runner', age: 12, location: { city: 'Tucson', state: 'AZ' } },
];

describe('pluck', () => {

   it('works correctly', () => {
      // Explicitly type the results so we can make sure that our types on pluck are
      // implemented correctly.
      const firstNames: string[] = pluck(PEOPLE, 'firstName'),
            ages: number[] = pluck(PEOPLE, 'age'),
            middleInitials: (string | undefined)[] = pluck(PEOPLE, 'middleInitial'),
            locations: (Location | undefined)[] = pluck(PEOPLE, 'location');

      expect(firstNames).to.eql([ 'John', 'Jane', 'Wile', 'Road' ]);
      expect(ages).to.eql([ 21, 22, 12, 12 ]);
      expect(middleInitials).to.eql([ undefined, undefined, 'E', undefined ]);
      expect(locations).to.eql([
         undefined,
         { city: 'New York', state: 'NY' },
         { city: 'Tucson', state: 'AZ' },
         { city: 'Tucson', state: 'AZ' },
      ]);
   });

});
