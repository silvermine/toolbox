import { get } from './get';
import { escapeHTML } from './escape-html';

const DEFAULT_SETTINGS: ToolboxTemplateSettings = {
   escape: /<%-([\s\S]+?)%>/g,
   interpolate: /<%=([\s\S]+?)%>/g,
};

function getValue(path: string, data: any): unknown {
   return get(data, (path || '').trim(), '');
}

export interface ToolboxTemplateSettings {
   escape: { source: string };
   interpolate: { source: string };
}

export interface ToolboxTemplateFunction {
   (data: Record<string, any>): string;
}

/**
 * A simple replacement for _.template from either Underscore or Lodash that removes the
 * features that make those libraries incompatible with Content Security Policy (CSP).
 * Specifically, this implementation supports only interpolation (escaped and unescaped)
 * and does not support JS evaluation.
 *
 * Use this function just like you would have used _.template:
 *
 * ```ts
 * template = template('Hello <%= name %>');
 * console.log(template({ name: 'John Smith' }));
 * ```
 *
 * This function only supports:
 *
 * `<%= … %>`: interpolate a value
 * `<%- … %>`: interpolate and HTML escape a value
 *
 * The following are NOT supported:
 *
 * `<% … %>`: JS evaluation
 * `<% print('Hello ' + epithet); %>`: JS evaluation with the print function
 *
 * Templating in Underscore/Lodash works by building/evaluation a JS function using a
 * string, essentially using `eval()` to evaluate the string as JS. This meant that if
 * your template referred to a variable that did not exist, you would see a JS error
 * thrown. In this function, however, undefined variables in the template will result in
 * an empty string placed in that location.
 */
export function makeTemplate(text: string, userSettings?: ToolboxTemplateSettings): (data: unknown) => string {
   type TemplateFunction = (data: unknown) => unknown;

   let index = 0;

   const parts: (TemplateFunction | string)[] = [],
         settings = Object.assign({}, DEFAULT_SETTINGS, userSettings || {}),
         regExpPattern = [ settings.escape.source, settings.interpolate.source ],
         matcher = new RegExp(regExpPattern.join('|') + '|$', 'g');

   text.replace(matcher, (match, escape, interpolate, offset) => {
      parts.push(text.slice(index, offset));
      index = offset + match.length;

      if (escape) {
         parts.push((data: any) => {
            return escapeHTML(getValue(escape, data));
         });
      } else if (interpolate) {
         parts.push(getValue.bind(null, interpolate));
      }

      // The types for this callback require us to return a string, but we don't really
      // care about the result of the call to `replace`, so we just return an empty string
      // here.
      return '';
   });

   return (data: unknown): string => {
      return parts.reduce((memo, part): string => {
         const result = (typeof part === 'function') ? `${part(data)}` : part;

         return memo + result;
      }, '') as string;
   };
}
