import { expect } from 'chai';
import { Optional } from '../../src/index';

describe('Optional', () => {

   interface Animal {
      name: string;
      species: string;
   }

   // NOTE These tests do not really check much at runtime. The real value is in the type
   // checking that happens by *using* the `Optional` type in this test. If we break the
   // definition of `Optional` so that it no longer selects the correct properties, the
   // TypeScript compiler will complain about this test.

   it('allows the specified optional property', () => {
      const testOptional: Optional<Animal, 'name'> = {
         species: 'fish',
      };

      expect(testOptional.species).to.strictlyEqual('fish');
      expect(testOptional.name).to.strictlyEqual(undefined);
   });

   it('allows multiple properties to be specified', () => {
      const testOptional: Optional<Animal, 'name' | 'species'> = {};

      expect(testOptional.species).to.strictlyEqual(undefined);
      expect(testOptional.name).to.strictlyEqual(undefined);
   });

   it('doesn\'t cause listed properties to be omitted from the type', () => {
      const testOptional: Optional<Animal, 'name' | 'species'> = {
         name: 'sterling',
         species: 'dog',
      };

      expect(testOptional.name).to.strictlyEqual('sterling');
      expect(testOptional.species).to.strictlyEqual('dog');
   });

});
