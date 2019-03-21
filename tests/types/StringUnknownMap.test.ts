import { expect } from 'chai';
import * as t from '../../src/index';


describe('isStringUnknownMap', () => {

   it('correctly classifies objects', () => {
      expect(t.isStringUnknownMap({})).to.strictlyEqual(true);
      expect(t.isStringUnknownMap({ a: 'b', c: [], h: {} })).to.strictlyEqual(true);
      expect(t.isStringUnknownMap({ a: 4 })).to.strictlyEqual(true);
      expect(t.isStringUnknownMap({ a: {} })).to.strictlyEqual(true);
      expect(t.isStringUnknownMap({ a: [] })).to.strictlyEqual(true);
      expect(t.isStringUnknownMap({ a: true })).to.strictlyEqual(true);
      expect(t.isStringUnknownMap({ a: null })).to.strictlyEqual(true);
      expect(t.isStringUnknownMap({ a: undefined })).to.strictlyEqual(true);
   });

   it('correctly classifies non-objects', () => {
      expect(t.isStringUnknownMap([])).to.strictlyEqual(false);
      expect(t.isStringUnknownMap(4)).to.strictlyEqual(false);
      expect(t.isStringUnknownMap('')).to.strictlyEqual(false);
      expect(t.isStringUnknownMap('a')).to.strictlyEqual(false);
      expect(t.isStringUnknownMap(true)).to.strictlyEqual(false);
      expect(t.isStringUnknownMap(undefined)).to.strictlyEqual(false);
      expect(t.isStringUnknownMap(null)).to.strictlyEqual(false);
   });

});
