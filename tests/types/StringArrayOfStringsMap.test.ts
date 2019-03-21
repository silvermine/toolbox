import { expect } from 'chai';
import * as t from '../../src/index';


describe('isStringArrayOfStringsMap', () => {

   it('correctly classifies objects', () => {
      expect(t.isStringArrayOfStringsMap({})).to.strictlyEqual(true);
      expect(t.isStringArrayOfStringsMap({ a: [] })).to.strictlyEqual(true);
      expect(t.isStringArrayOfStringsMap({ a: [ 'b' ] })).to.strictlyEqual(true);
      expect(t.isStringArrayOfStringsMap({ a: [ 'b', 'c' ] })).to.strictlyEqual(true);

      expect(t.isStringArrayOfStringsMap({ a: [ 'b', 4 ] })).to.strictlyEqual(false);

      expect(t.isStringArrayOfStringsMap({ a: 'b' })).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap({ a: 'b', b: 'c' })).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap({ a: 'b', b: [ 'c', 'd' ] })).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap({ a: 'b', b: [ 'c', 'd' ], e: { f: 'g', h: [ 'i', 'j' ] } })).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap({ a: { b: [] } })).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap({ a: { b: [ 'c', 'd' ] } })).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap({ a: 4 })).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap({ a: [ 'b', 4 ] })).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap({ a: { b: [ { c: 'd' } ] } })).to.strictlyEqual(false);
   });

   it('correctly classifies non-objects', () => {
      expect(t.isStringArrayOfStringsMap([])).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap(4)).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap('')).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap('a')).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap(true)).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap(undefined)).to.strictlyEqual(false);
      expect(t.isStringArrayOfStringsMap(null)).to.strictlyEqual(false);
   });

});
