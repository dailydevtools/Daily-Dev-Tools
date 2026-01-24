import { Metadata } from 'next';
import JsonCsvConverterClient from "./Client";

export const metadata: Metadata = {
    title: 'JSON to CSV Converter | DailyDevTools',
    description: 'Convert JSON to CSV and CSV to JSON online. Free, fast and secure converter.',
};

export default function JsonConverterPage() {
    return <JsonCsvConverterClient />;
}
