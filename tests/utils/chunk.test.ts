import { expect } from 'chai';
import { chunk } from '../../src';

describe('chunk', () => {

   function runTest<T>(size: number, input: T[], expected: T[][]): void {
      expect(chunk(input, size)).to.eql(expected);
   }

   it('returns an empty array when size is < 1', () => {
      for (let i = 0; i >= -30; i--) {
         runTest(
            i,
            [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
            []
         );
      }
   });

   it('chunks things correctly', () => {
      runTest(
         1,
         [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
         [ [ 'a' ], [ 'b' ], [ 'c' ], [ 'd' ], [ 'e' ], [ 'f' ], [ 'g' ], [ 'h' ], [ 'i' ], [ 'j' ], [ 'k' ] ]
      );
      runTest(
         2,
         [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
         [ [ 'a', 'b' ], [ 'c', 'd' ], [ 'e', 'f' ], [ 'g', 'h' ], [ 'i', 'j' ], [ 'k' ] ]
      );
      runTest(
         3,
         [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
         [ [ 'a', 'b', 'c' ], [ 'd', 'e', 'f' ], [ 'g', 'h', 'i' ], [ 'j', 'k' ] ]
      );
      runTest(
         4,
         [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
         [ [ 'a', 'b', 'c', 'd' ], [ 'e', 'f', 'g', 'h' ], [ 'i', 'j', 'k' ] ]
      );
      runTest(
         5,
         [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
         [ [ 'a', 'b', 'c', 'd', 'e' ], [ 'f', 'g', 'h', 'i', 'j' ], [ 'k' ] ]
      );
      runTest(
         6,
         [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
         [ [ 'a', 'b', 'c', 'd', 'e', 'f' ], [ 'g', 'h', 'i', 'j', 'k' ] ]
      );
      runTest(
         8,
         [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
         [ [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ], [ 'i', 'j', 'k' ] ]
      );
      runTest(
         9,
         [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
         [ [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ], [ 'j', 'k' ] ]
      );
      runTest(
         10,
         [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
         [ [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ], [ 'k' ] ]
      );
   });

   it('returns single-element array containing entirety of input when size is >= input length', () => {
      runTest(
         11,
         [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
         [ [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ] ]
      );
      runTest(
         12,
         [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
         [ [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ] ]
      );
      for (let i = 13; i <= 30; i++) {
         runTest(
            i,
            [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ],
            [ [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ] ]
         );
      }
   });

});
