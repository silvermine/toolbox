/**
 * This is a polyfill for the Omit helper type that was released with TS 3.5:
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html#the-omit-helper-type
 *
 * @deprecated This will be removed once the TS version for this project has been upgraded
 * to TS 3.5 or greater
 */
// eslint-disable-next-line @typescript-eslint/no-type-alias
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
