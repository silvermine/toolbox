import { expect } from 'chai';
import { range } from '../../src';

describe('range', () => {
   it('works when only start is provided', () => {
      expect(range(4)).to.eql([ 0, 1, 2, 3 ]);
   });

   it('works when only start and end are provided', () => {
      expect(range(1, 5)).to.eql([ 1, 2, 3, 4 ]);
   });

   it('works when start, end, and step is provided', () => {
      expect(range(0, 20, 5)).to.eql([ 0, 5, 10, 15 ]);
   });

   it('works when start is set to a negative number', () => {
      expect(range(-4)).to.eql([ 0, -1, -2, -3 ]);
   });

   it('works when step is set to zero', () => {
      expect(range(1, 4, 0)).to.eql([ 1, 2, 3 ]);
   });

   it('works when step is a negative number ', () => {
      expect(range(2, -4, -2)).to.eql([ 2, 0, -2 ]);
   });

   it('return an empty array when end and start are the same', () => {
      expect(range(0, 0)).to.eql([]);
   });

   it('returns an empty array if only start is provided and equals zero', () => {
      expect(range(0)).to.eql([]);
   });

   it('returns an empty array if arguments do not work', () => {
      expect(range(5, 1, 2)).to.eql([]);
   });

});
