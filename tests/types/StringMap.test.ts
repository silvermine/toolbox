import { expect } from 'chai';
import * as t from '../../src/index';


describe('isStringMap', () => {

   it('correctly classifies objects', () => {
      expect(t.isStringMap({})).to.strictlyEqual(true);
      expect(t.isStringMap({ a: 'b', c: 'd' })).to.strictlyEqual(true);
      expect(t.isStringMap({ a: 4 })).to.strictlyEqual(false);
      expect(t.isStringMap({ a: {} })).to.strictlyEqual(false);
      expect(t.isStringMap({ a: [] })).to.strictlyEqual(false);
      expect(t.isStringMap({ a: true })).to.strictlyEqual(false);
      expect(t.isStringMap({ a: null })).to.strictlyEqual(false);
      expect(t.isStringMap({ a: undefined })).to.strictlyEqual(false);
   });

   it('correctly classifies non-objects', () => {
      expect(t.isStringMap([])).to.strictlyEqual(false);
      expect(t.isStringMap(4)).to.strictlyEqual(false);
      expect(t.isStringMap('')).to.strictlyEqual(false);
      expect(t.isStringMap('a')).to.strictlyEqual(false);
      expect(t.isStringMap(true)).to.strictlyEqual(false);
      expect(t.isStringMap(undefined)).to.strictlyEqual(false);
      expect(t.isStringMap(null)).to.strictlyEqual(false);
   });

});
