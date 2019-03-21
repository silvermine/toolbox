/* istanbul ignore next */

// Removes `readonly` modifier and make all keys writable again
export type Writable<T> = { -readonly [P in keyof T]-?: T[P] }
