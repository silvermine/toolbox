import { expect } from 'chai';
import * as t from '../../src/index';


describe('isEmpty', () => {

   it('correctly classifies empty things', () => {
      expect(t.isEmpty([])).to.strictlyEqual(true);
      // eslint-disable-next-line
      expect(t.isEmpty(new Array())).to.strictlyEqual(true);
      expect(t.isEmpty({})).to.strictlyEqual(true);
      expect(t.isEmpty('')).to.strictlyEqual(true);
      // eslint-disable-next-line no-new-wrappers
      expect(t.isEmpty(new String(''))).to.strictlyEqual(true);
      expect(t.isEmpty(null)).to.strictlyEqual(true);
      expect(t.isEmpty(undefined)).to.strictlyEqual(true);
      // Boolean values are empty
      expect(t.isEmpty(true)).to.strictlyEqual(true);
      expect(t.isEmpty(false)).to.strictlyEqual(true);
      // Numbers are empty
      expect(t.isEmpty(0)).to.strictlyEqual(true);
      expect(t.isEmpty(4)).to.strictlyEqual(true);
      expect(t.isEmpty(3.14)).to.strictlyEqual(true);
      // Objects with prototype properties are considered empty
      // @see https://github.com/jashkenas/underscore/blob/d5fe0fd4060f13b40608cb9d92eda6d857e8752c/underscore.js#L1301
      expect(t.isEmpty(/(?:)/)).to.strictlyEqual(true);

      // eslint-disable-next-line no-empty-function
      expect(t.isEmpty(() => {})).to.strictlyEqual(true);

      // deleting all the keys from on object empties it
      const o: { a?: boolean } = { a: true };

      expect(t.isEmpty(o)).to.strictlyEqual(false);
      delete o.a;
      expect(t.isEmpty(o)).to.strictlyEqual(true);
   });

   it('correctly classifies non-empty things', () => {
      expect(t.isEmpty('test')).to.strictlyEqual(false);
      expect(t.isEmpty({ length: 0 })).to.strictlyEqual(false);
      expect(t.isEmpty([ 1 ])).to.strictlyEqual(false);
      expect(t.isEmpty(new Array(10))).to.strictlyEqual(false);
   });

});
