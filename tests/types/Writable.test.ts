import { expect } from 'chai';
import { Writable, StringMap } from '../../src/index';

describe('Writable', () => {

   // NOTE This test does not really check much at runtime. The real value is in the type
   // checking that happens by *using* the `Writable` type in this test. If we break the
   // definition of `Writable` so that it no longer makes a type's properties writable,
   // the TypeScript compiler will complain about this test.
   it('makes readonly properties writable', () => {
      // eslint-disable-next-line @typescript-eslint/no-type-alias
      type ReadOnlyStringMap = Readonly<StringMap>;

      const obj: ReadOnlyStringMap = { a: 'test' };

      expect(obj.a).to.strictlyEqual('test');

      const writable: Writable<ReadOnlyStringMap> = obj;

      writable.a = 'changed';

      expect(writable.a).to.strictlyEqual('changed');
      expect(obj.a).to.strictlyEqual('changed');
   });

});
