import { expect } from 'chai';
import { getTagString } from '../../src/utils/get-tag-string';


describe('getTagString', () => {

   it('returns string "tags" that contain an object\'s type', () => {
      expect(getTagString([])).to.strictlyEqual('[object Array]');
      expect(getTagString({})).to.strictlyEqual('[object Object]');
      expect(getTagString(4)).to.strictlyEqual('[object Number]');
      expect(getTagString('')).to.strictlyEqual('[object String]');
      expect(getTagString(true)).to.strictlyEqual('[object Boolean]');
      expect(getTagString(undefined)).to.strictlyEqual('[object Undefined]');
      expect(getTagString(null)).to.strictlyEqual('[object Null]');
      // eslint-disable-next-line no-empty-function
      expect(getTagString(() => {})).to.strictlyEqual('[object Function]');
   });

});
