import { getTagString } from './get-tag-string';

export function isArguments(o: any): boolean {
   return getTagString(o) === '[object Arguments]';
}
