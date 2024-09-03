import { expect } from 'chai';
import { compact } from '../../src';

describe('compact', () => {

   it('compact arrays', () => {
      const arrA: (string | number | boolean | null | undefined)[] = [
         'foo',
         0,
         '',
         true,
         false,
         null,
         'hello',
         undefined,
         42,
         NaN,
      ];

      const arrB: (string | number | boolean)[] = compact(arrA);

      expect(arrB).to.eql([
         'foo',
         true,
         'hello',
         42,
      ]);
   });
});
