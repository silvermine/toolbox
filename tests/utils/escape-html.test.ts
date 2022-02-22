import { expect } from 'chai';
import { escapeHTML } from '../../src/index';


describe('escapeHTML', () => {

   it('converts characters used in HTML tags to HTML entities', () => {
      expect(escapeHTML('<b>Hi</b>')).to.strictlyEqual('&lt;b&gt;Hi&lt;/b&gt;');
      expect(escapeHTML('<b>  Hi  </b>')).to.strictlyEqual('&lt;b&gt;  Hi  &lt;/b&gt;');
      expect(escapeHTML('"Hi"')).to.strictlyEqual('&quot;Hi&quot;');
      expect(escapeHTML(`'Hi'`)).to.strictlyEqual('&#x27;Hi&#x27;'); // eslint-disable-line quotes
      expect(escapeHTML('`Hi`')).to.strictlyEqual('&#x60;Hi&#x60;');
      expect(escapeHTML('`Hi`')).to.strictlyEqual('&#x60;Hi&#x60;');
      expect(escapeHTML('<p class="greeting">Hi</p>')).to.strictlyEqual('&lt;p class=&quot;greeting&quot;&gt;Hi&lt;/p&gt;');
      expect(escapeHTML('')).to.strictlyEqual('');
   });

   it('handles nested HTML structures', () => {
      expect(escapeHTML('<div class="greeting"><p>Hi</p></div>')).to
         .strictlyEqual('&lt;div class=&quot;greeting&quot;&gt;&lt;p&gt;Hi&lt;/p&gt;&lt;/div&gt;');
   });

   it('handles newlines', () => {
      const HTML = '<div class="greeting">\n<p>\nHi\n</p>\n</div>';

      expect(escapeHTML(HTML)).to.strictlyEqual('&lt;div class=&quot;greeting&quot;&gt;\n&lt;p&gt;\nHi\n&lt;/p&gt;\n&lt;/div&gt;');
   });

});
