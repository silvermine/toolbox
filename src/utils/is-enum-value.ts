/**
 * Type guard to check to see if the given value is a valid value for the enum.
 */
export function isEnumValue<T extends object>(enumType: T, value: unknown): value is T[keyof T] {
   return (Object.keys(enumType) as Array<keyof T>)
      .map((key) => {
         return enumType[key];
      })
      .some((x) => {
         return x === value;
      });
}
