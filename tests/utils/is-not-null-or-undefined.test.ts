import { expect } from 'chai';
import * as t from '../../src/index';


describe('isNotNullOrUndefined', () => {

   it('can be used as an array filter and typeguard', () => {
      // Can only assign arrB here because null and undefined values are removed.
      const arrA = [ 0, 1, 2, null, 3, undefined, 4, '', 'foo' ],
            arrB: (number | string)[] = arrA.filter(t.isNotNullOrUndefined);

      expect(arrB).to.eql([ 0, 1, 2, 3, 4, '', 'foo' ]);
   });

});
