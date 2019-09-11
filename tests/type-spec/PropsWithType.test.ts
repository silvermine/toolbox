import { PropsWithType } from '../../src/types/PropsWithType'; // TODO: use `../../src/index`

interface SampleType {
   readonly prop: string;
   readonly anotherProp: number;
   readonly additionalProp: number;
}

// $ExpectType "anotherProp" | "additionalProp"
type OnlyAllowNumberProps = PropsWithType<SampleType, number>;

// $ExpectType "prop"
type OnlyAllowStringProps = PropsWithType<SampleType, string>;

// $ExpectType "prop" | "anotherProp"
type ThisOneFails = PropsWithType<SampleType, string>;
