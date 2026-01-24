import { Metadata } from 'next';
import RomanNumeralsClient from "./Client";

export const metadata: Metadata = {
    title: 'Roman Numeral Converter | DailyDevTools',
    description: 'Bidirectional converter for Roman Numerals (I, V, X...) and decimals.',
};

export default function RomanNumeralsPage() {
    return <RomanNumeralsClient />;
}
