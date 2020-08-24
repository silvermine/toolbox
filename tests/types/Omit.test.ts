import { expect } from 'chai';
import { Omit } from '../../src/index';

describe('Omit', () => {

   interface Animal {
      name: string;
      species: string;
   }

   // NOTE These tests do not really check much at runtime. The real value is in the type
   // checking that happens by *using* the `Omit` type in this test. If we break the
   // definition of `Omit` so that it no longer selects the correct properties, the
   // TypeScript compiler will complain about this test.

   it('removes the specified property', () => {
      const testOptional: Omit<Animal, 'name'> = {
         species: 'fish',
      };

      expect(testOptional.species).to.strictlyEqual('fish');
   });

   it('allows multiple properties to be specified', () => {
      const testOptional: Omit<Animal, 'name' | 'species'> = {};

      expect(testOptional).to.eql({});
   });

});
