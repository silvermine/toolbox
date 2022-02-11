import { isString } from './is-string';

const ESCAPE_ENTITIES: Record<string, string> = {
   '&': '&amp;',
   '<': '&lt;',
   '>': '&gt;',
   '"': '&quot;',
   "'": '&#x27;', // eslint-disable-line quotes
   '`': '&#x60;',
};

const ESCAPE_ENTITIES_PATTERN = '(?:' + Object.keys(ESCAPE_ENTITIES).join('|') + ')',
      ESCAPE_ENTITIES_REGEX = new RegExp(ESCAPE_ENTITIES_PATTERN),
      ESCAPE_ENTITIES_REPLACE_REGEX = new RegExp(ESCAPE_ENTITIES_PATTERN, 'g');

export function escapeHTML(str: unknown): unknown {
   if (isString(str) && ESCAPE_ENTITIES_REGEX.test(str)) {
      return str.replace(ESCAPE_ENTITIES_REPLACE_REGEX, (match) => {
         return ESCAPE_ENTITIES[match];
      });
   }

   return str;
}
