import { expect } from 'chai';
import * as t from '../../src/index';

describe('isEnumValue', () => {

   enum StringEnum {
      ValueA = 'a',
      ValueB = 'b',
   }

   enum NumberEnum {
      ValueOne = 1,
      ValueTwo = 2,
   }

   enum MixedEnum {
      NumberOne = 1,
      StringTwo = 'two',
   }

   it('correctly identifies enum values', () => {
      expect(t.isEnumValue(StringEnum, 'a')).to.strictlyEqual(true);
      expect(t.isEnumValue(StringEnum, 'b')).to.strictlyEqual(true);
      expect(t.isEnumValue(StringEnum, StringEnum.ValueA)).to.strictlyEqual(true);
      expect(t.isEnumValue(StringEnum, StringEnum.ValueB)).to.strictlyEqual(true);

      expect(t.isEnumValue(NumberEnum, 1)).to.strictlyEqual(true);
      expect(t.isEnumValue(NumberEnum, 2)).to.strictlyEqual(true);
      expect(t.isEnumValue(NumberEnum, NumberEnum.ValueOne)).to.strictlyEqual(true);
      expect(t.isEnumValue(NumberEnum, NumberEnum.ValueTwo)).to.strictlyEqual(true);

      expect(t.isEnumValue(MixedEnum, 1)).to.strictlyEqual(true);
      expect(t.isEnumValue(MixedEnum, 'two')).to.strictlyEqual(true);
      expect(t.isEnumValue(MixedEnum, MixedEnum.NumberOne)).to.strictlyEqual(true);
      expect(t.isEnumValue(MixedEnum, MixedEnum.StringTwo)).to.strictlyEqual(true);
   });

   it('correctly identifies values that are not part of the enum', () => {
      expect(t.isEnumValue(StringEnum, '')).to.strictlyEqual(false);
      expect(t.isEnumValue(StringEnum, 'c')).to.strictlyEqual(false);
      expect(t.isEnumValue(StringEnum, 0)).to.strictlyEqual(false);
      expect(t.isEnumValue(StringEnum, 1)).to.strictlyEqual(false);
      expect(t.isEnumValue(StringEnum, false)).to.strictlyEqual(false);
      expect(t.isEnumValue(StringEnum, true)).to.strictlyEqual(false);
      expect(t.isEnumValue(StringEnum, [])).to.strictlyEqual(false);
      expect(t.isEnumValue(StringEnum, [ 'a' ])).to.strictlyEqual(false);
      expect(t.isEnumValue(StringEnum, {})).to.strictlyEqual(false);

      expect(t.isEnumValue(NumberEnum, '')).to.strictlyEqual(false);
      expect(t.isEnumValue(NumberEnum, 'a')).to.strictlyEqual(false);
      expect(t.isEnumValue(NumberEnum, 0)).to.strictlyEqual(false);
      expect(t.isEnumValue(NumberEnum, 3)).to.strictlyEqual(false);
      expect(t.isEnumValue(NumberEnum, false)).to.strictlyEqual(false);
      expect(t.isEnumValue(NumberEnum, true)).to.strictlyEqual(false);
      expect(t.isEnumValue(NumberEnum, [])).to.strictlyEqual(false);
      expect(t.isEnumValue(NumberEnum, [ 1 ])).to.strictlyEqual(false);
      expect(t.isEnumValue(NumberEnum, {})).to.strictlyEqual(false);

      expect(t.isEnumValue(MixedEnum, '')).to.strictlyEqual(false);
      expect(t.isEnumValue(MixedEnum, 'a')).to.strictlyEqual(false);
      expect(t.isEnumValue(MixedEnum, 0)).to.strictlyEqual(false);
      expect(t.isEnumValue(MixedEnum, 2)).to.strictlyEqual(false);
      expect(t.isEnumValue(MixedEnum, false)).to.strictlyEqual(false);
      expect(t.isEnumValue(MixedEnum, true)).to.strictlyEqual(false);
      expect(t.isEnumValue(MixedEnum, [])).to.strictlyEqual(false);
      expect(t.isEnumValue(MixedEnum, [ 'two' ])).to.strictlyEqual(false);
      expect(t.isEnumValue(MixedEnum, {})).to.strictlyEqual(false);
   });

});
