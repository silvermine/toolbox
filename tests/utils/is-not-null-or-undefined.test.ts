import { expect } from 'chai';
import * as t from '../../src/index';


describe('isNotNullOrUndefined', () => {

   it('can be used as an array filter and typeguard', () => {

      const arrA = [ 0, 1, 2, null, 3, undefined, 4, '', 'foo' ];

      // Cannot assign `arrB = arrA` since arrB won't allow null or undefined.
      let arrB: (number | string)[];

      const arrC = arrA.filter(t.isNotNullOrUndefined);

      // CAN assign `arrB = arrC` since arrC has now had all null and undefined values
      // removed.
      arrB = arrC;

      expect(arrB).to.eql([ 0, 1, 2, 3, 4, '', 'foo' ]);

   });

});
