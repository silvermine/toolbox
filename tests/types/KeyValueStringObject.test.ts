import { expect } from 'chai';
import * as t from '../../src/index';


describe('isKeyValueStringObject', () => {

   it('correctly classifies objects', () => {
      expect(t.isKeyValueStringObject({})).to.strictlyEqual(true);
      expect(t.isKeyValueStringObject({ a: 'b' })).to.strictlyEqual(true);
      expect(t.isKeyValueStringObject({ a: 'b', b: 'c' })).to.strictlyEqual(true);
      expect(t.isKeyValueStringObject({ a: 'b', b: [ 'c', 'd' ] })).to.strictlyEqual(true);
      expect(t.isKeyValueStringObject({ a: 'b', b: [ 'c', 'd' ], e: { f: 'g', h: [ 'i', 'j' ] } })).to.strictlyEqual(true);
      expect(t.isKeyValueStringObject({ a: { b: [] } })).to.strictlyEqual(true);
      expect(t.isKeyValueStringObject({ a: { b: [ 'c', 'd' ] } })).to.strictlyEqual(true);

      expect(t.isKeyValueStringObject({ a: 4 })).to.strictlyEqual(false);
      expect(t.isKeyValueStringObject({ a: [ 'b', 4 ] })).to.strictlyEqual(false);
      expect(t.isKeyValueStringObject({ a: { b: [ { c: 'd' } ] } })).to.strictlyEqual(false);
   });

   it('correctly classifies non-objects', () => {
      expect(t.isKeyValueStringObject([])).to.strictlyEqual(false);
      expect(t.isKeyValueStringObject(4)).to.strictlyEqual(false);
      expect(t.isKeyValueStringObject('')).to.strictlyEqual(false);
      expect(t.isKeyValueStringObject('a')).to.strictlyEqual(false);
      expect(t.isKeyValueStringObject(true)).to.strictlyEqual(false);
      expect(t.isKeyValueStringObject(undefined)).to.strictlyEqual(false);
      expect(t.isKeyValueStringObject(null)).to.strictlyEqual(false);
   });

});
