import { expect } from 'chai';
import { StrictUnion } from '../../src/index';

describe('StrictUnion', () => {

   // NOTE These tests do not really check much at runtime. The real value is in the type
   // checking that happens by *using* the `StrictUnion` type in this test. If we break
   // the definition of `StrictUnion` so that it no longer selects the correct
   // properties, the TypeScript compiler will complain about this test.

   it('unions two types as expected', () => {
      interface Animal {
         name: string;
      }

      interface Dog extends Animal {
         furColor: string;
      }

      interface Fish extends Animal {
         finCount: number;
      }

      // eslint-disable-next-line @typescript-eslint/no-type-alias
      type Pet = StrictUnion<Dog | Fish>;

      function adoptDog(dog: Dog): void {
         expect(dog.name).to.be.a('string');
         expect(dog.furColor).to.be.a('string');
      }

      function adoptFish(fish: Fish): void {
         expect(fish.name).to.be.a('string');
         expect(fish.finCount).to.be.a('number');
      }

      function adoptPet(pet: Pet): void {
         expect(pet.name).to.be.a('string');
         expect(pet.furColor).to.be.oneOf([ 'white', undefined ]);
         expect(pet.finCount).to.be.oneOf([ undefined, 7.5 ]);
      }

      const spot: Pet = {
         name: 'Spot',
         furColor: 'white',
         // Uncommenting `finCount` should result in "Types of property 'finCount' are
         // incompatible." ts(2322)
         // finCount: 0,
      };

      adoptPet(spot);
      adoptDog(spot);
      // Uncommenting `adoptFish` should result in "Types of property 'finCount' are
      // incompatible." ts(2345)
      // adoptFish(spot);

      const fido: Dog = {
         name: 'Fido',
         furColor: 'white',
         // Uncommenting `finCount` should result in "Types of property 'finCount' are
         // incompatible." ts(2322)
         // finCount: 0,
      };

      adoptPet(fido);
      adoptDog(fido);
      // Uncommenting `adoptFish` should result in "Types of property 'finCount' are
      // incompatible." ts(2345)
      // adoptFish(fido);

      const nemo: Pet = {
         name: 'Nemo',
         // Uncommenting `furColor` should result in "Types of property 'furColor' are
         // incompatible." ts(2322)
         // furColor: 'n/a',
         finCount: 7.5,
      };

      adoptPet(nemo);
      // Uncommenting `adoptDog` should result in "Types of property 'furColor' are
      // incompatible." ts(2345)
      // adoptDog(nemo);
      adoptFish(nemo);

      const dory: Fish = {
         name: 'Dory',
         // Uncommenting `furColor` should result in "Types of property 'furColor' are
         // incompatible." ts(2322)
         // furColor: 'n/a',
         finCount: 7.5,
      };

      adoptPet(dory);
      // Uncommenting `adoptDog` should result in "Types of property 'furColor' are
      // incompatible." ts(2345)
      // adoptDog(dory);
      adoptFish(dory);

      // NOTE: leaving the following cases commented out as we don't have an automated way
      // to test types. This package cannot ship with these uncommented as they report the
      // error "X is declared but never used.ts(6196)".

      // type PetName = Pet['name']; // Should be: "string"
      // type PetFurColor = Pet['furColor']; // Should be: "string | undefined"
      // type PetFinCount = Pet['finCount']; // Should be: "number | undefined"
   });

});
