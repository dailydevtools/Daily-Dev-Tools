import { Metadata } from 'next';
import UnitConverterClient from "./Client";

export const metadata: Metadata = {
    title: 'Unit Converter | DailyDevTools',
    description: 'Convert common units like Length, Weight, and Temperature instantly.',
};

export default function UnitConverterPage() {
    return <UnitConverterClient />;
}
