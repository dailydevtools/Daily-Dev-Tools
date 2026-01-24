import { Metadata } from 'next';
import SqlToJsonClient from "./Client";

export const metadata: Metadata = {
    title: 'SQL to JSON Converter | DailyDevTools',
    description: 'Convert SQL INSERT statements to JSON. Useful for data migration.',
};

export default function SqlToJsonPage() {
    return <SqlToJsonClient />;
}
