import { expect } from 'chai';
import { makeTemplate } from '../../src/index';


describe('makeTemplate', () => {

   it('returns a function when making a template', function() {
      expect(makeTemplate('Hello <%= name %>')).to.be.a('function');
   });

   function one(tmpl: string, expected: string, data: Record<string, any>): void {
      const compiled = makeTemplate(tmpl);

      expect(compiled(data)).to.eql(expected);
   }

   function testSuite(tag: string, data: Record<string, unknown>, expected: string): void {
      it('works with single simple value', function() {
         one('Hello ' + tag + ' name %>', expected, {
            name: (data.firstName + ' ' + data.lastName),
         });
      });
      it('works with multiple simple values', function() {
         one('Hello ' + tag + ' firstName %> ' + tag + ' lastName %>', expected, data);
      });
      it('works with nested objects', function() {
         one('Hello ' + tag + ' person.firstName %> ' + tag + ' person.lastName %>', expected, { person: data });
      });
      it('works with arrays', function() {
         one('Hello ' + tag + ' people[0].firstName %> ' + tag + ' people[0].lastName %>', expected, { people: [ data ] });
      });
      it('works with deeply nested objects', function() {
         one(
            'Hello ' + tag + ' data.people[0].firstName %> ' + tag + ' data.people[0].lastName %>',
            expected,
            { data: { people: [ data ] } }
         );
      });
      it('works with deeply nested objects, using an array with a non-zero index', function() {
         one(
            'Hello ' + tag + ' data.people[1].firstName %> ' + tag + ' data.people[1].lastName %>',
            expected,
            { data: { people: [ null, data ] } }
         );
      });
   }

   describe('basic operation', function() {
      testSuite('<%=', { firstName: 'John', lastName: 'Smith' }, 'Hello John Smith');

      it('uses a blank string for undefined values', function() {
         one('Hello <%= people[1].firstName %>', 'Hello ', { people: [] });
      });

      it('uses a blank string for existing keys but undefined values', function() {
         one('Hello <%= people[0].firstName %>', 'Hello ', { people: [ { firstName: undefined } ] });
      });
   });

   describe('does not escape interpolated', function() {
      testSuite('<%=', { firstName: 'John<br>', lastName: 'Smith' }, 'Hello John<br> Smith');
   });

   describe('escapes interpolated', function() {
      testSuite('<%-', { firstName: 'John<br>', lastName: 'Smith' }, 'Hello John&lt;br&gt; Smith');
   });
});
