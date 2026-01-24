import { Metadata } from 'next';
import AsciiConverterClient from "./Client";

export const metadata: Metadata = {
    title: 'ASCII Converter | DailyDevTools',
    description: 'Convert text to ASCII decimal codes and back instantly.',
};

export default function AsciiConverterPage() {
    return <AsciiConverterClient />;
}
