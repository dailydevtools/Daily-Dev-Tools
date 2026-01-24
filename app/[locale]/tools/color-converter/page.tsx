import { Metadata } from 'next';
import ColorConverterClient from "./Client";

export const metadata: Metadata = {
    title: 'Color Converter | DailyDevTools',
    description: 'Convert colors between HEX, RGB, and HSL formats.',
};

export default function ColorConverterPage() {
    return <ColorConverterClient />;
}
