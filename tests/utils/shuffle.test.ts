import { expect } from 'chai';
import { shuffle } from '../../src';

describe('shuffle', () => {

   it('returns an empty array when given an empty array', () => {
      expect(shuffle([])).to.eql([]);
   });

   it('returns an array with the same single element', () => {
      expect(shuffle([ 'a' ])).to.eql([ 'a' ]);
      expect(shuffle([ 1 ])).to.eql([ 1 ]);
   });

   it('does not mutate the original array', () => {
      const original = [ 1, 2, 3, 4, 5 ],
            copy = [ ...original ];

      shuffle(original);

      expect(original).to.eql(copy);
   });

   it('returns an array with the same elements', () => {
      const input = [ 1, 2, 3, 4, 5 ],
            result = shuffle(input);

      expect(result.sort()).to.eql(input.sort());
   });

   it('preserves duplicate elements', () => {
      const input = [ 1, 1, 2, 2, 3, 3 ],
            result = shuffle(input);

      expect(result.sort()).to.eql([ 1, 1, 2, 2, 3, 3 ]);
   });

   it('works with objects', () => {
      const obj1 = { id: 1 },
            obj2 = { id: 2 },
            obj3 = { id: 3 },
            input = [ obj1, obj2, obj3 ],
            result = shuffle(input);

      expect(result).to.have.lengthOf(3);
      expect(result).to.include(obj1);
      expect(result).to.include(obj2);
      expect(result).to.include(obj3);
   });

   describe('with custom random function', () => {

      it('produces deterministic results with seeded random', () => {
         // Create a simple linear congruential generator for deterministic testing
         function createSeededRandom(seed: number): () => number {
            let state = seed;

            return () => {
               state = (state * 1103515245 + 12345) % 2147483648;
               return state / 2147483648;
            };
         }

         const input = [ 'a', 'b', 'c', 'd', 'e' ],
               random1 = createSeededRandom(42),
               random2 = createSeededRandom(42),
               result1 = shuffle(input, random1),
               result2 = shuffle(input, random2);

         expect(result1).to.eql(result2);
      });

      it('shuffles correctly with a predictable random function', () => {
         // For a 5-element array shuffled with Fisher-Yates:
         // i=4: j = floor(random() * 5), swap arr[4] and arr[j]
         // i=3: j = floor(random() * 4), swap arr[3] and arr[j]
         // i=2: j = floor(random() * 3), swap arr[2] and arr[j]
         // i=1: j = floor(random() * 2), swap arr[1] and arr[j]

         // With random always returning 0, j is always 0
         // Start: [1, 2, 3, 4, 5]
         // i=4: swap(4, 0) -> [5, 2, 3, 4, 1]
         // i=3: swap(3, 0) -> [4, 2, 3, 5, 1]
         // i=2: swap(2, 0) -> [3, 2, 4, 5, 1]
         // i=1: swap(1, 0) -> [2, 3, 4, 5, 1]

         const input = [ 1, 2, 3, 4, 5 ],
               alwaysZero = (): number => { return 0; },
               result = shuffle(input, alwaysZero);

         expect(result).to.eql([ 2, 3, 4, 5, 1 ]);
      });

   });

   describe('with two elements', () => {

      it('can return elements in original order', () => {
         // random() returns 0, so j=0 for i=1, swap(1, 0) -> swapped
         // To keep original order, we need j=1, which requires random() >= 0.5
         const input = [ 'a', 'b' ],
               highRandom = (): number => { return 0.99; },
               result = shuffle(input, highRandom);

         expect(result).to.eql([ 'a', 'b' ]);
      });

      it('can return elements in swapped order', () => {
         const input = [ 'a', 'b' ],
               lowRandom = (): number => { return 0; },
               result = shuffle(input, lowRandom);

         expect(result).to.eql([ 'b', 'a' ]);
      });

   });

});
