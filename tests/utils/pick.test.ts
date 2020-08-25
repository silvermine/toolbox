import { expect } from 'chai';
import { pick } from '../../src';

describe('pick', () => {

   describe('picks the specified properties', () => {
      const input = {
         a: 1,
         b: 'hello',
         c: false,
         d: { b: 2 },
      };

      it('works with number properties', () => {
         const result: { a: number } = pick(input, 'a');

         expect(result).to.eql({ a: 1 });
      });

      it('works with boolean properties', () => {
         const result: { b: string } = pick(input, 'b');

         expect(result).to.eql({ b: 'hello' });
      });

      it('works with boolean properties', () => {
         const result: { c: boolean } = pick(input, 'c');

         expect(result).to.eql({ c: false });
      });

      it('works with object properties', () => {
         const result: { d: object } = pick(input, 'd');

         expect(result).to.eql({ d: { b: 2 } });
         expect(result.d).to.strictlyEqual(input.d);
      });

      it('works when provided multiple properties', () => {
         const result: { b: string } = pick(input, 'a', 'b');

         expect(result).to.eql({ a: 1, b: 'hello' });
      });
   });

   it('works with empty objects', () => {
      expect(pick({})).to.eql({});
   });

});
