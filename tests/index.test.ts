import { expect } from 'chai';
import * as t from '../src/index';


describe('@silvermine/toolbox', () => {

   it('exports an object', () => {
      expect(t).to.be.an('object');
      expect(Object.keys(t).length).to.be.greaterThan(0);
   });

});
