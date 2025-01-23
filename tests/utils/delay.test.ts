import { expect } from 'chai';
import { delay, isPromiseLike } from '../../src';

describe('delay', () => {

   it('delays before returning a value', async () => {
      const promise = delay(10, 'this-is-my-test-value');

      let after: string | null = null;

      promise.then((v) => { after = v; });

      expect(isPromiseLike(promise)).to.eql(true);
      expect(after).to.strictlyEqual(null);

      setTimeout(() => {
         expect(after).to.strictlyEqual(null);
      }, 5);

      const result = await promise;

      expect(result).to.eql('this-is-my-test-value');
      expect(after).to.eql('this-is-my-test-value');
   });

   it('returns undefined when no value supplied', async () => {
      let after: string | undefined = 'initial-value';

      const promise = delay(10);

      promise.then((v) => { after = v; });

      expect(isPromiseLike(promise)).to.eql(true);
      expect(after).to.eql('initial-value');

      setTimeout(() => {
         expect(after).to.eql('initial-value');
      }, 5);

      const result = await promise;

      expect(result).to.strictlyEqual(undefined);
      expect(after).to.strictlyEqual(undefined);
   });

});
