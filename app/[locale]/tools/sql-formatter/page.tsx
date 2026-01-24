import { Metadata } from 'next';
import SqlFormatterClient from "./Client";

export const metadata: Metadata = {
    title: 'SQL Formatter | DailyDevTools',
    description: 'Format, beautify and simplify SQL queries.',
};

export default function SqlFormatterPage() {
    return <SqlFormatterClient />;
}
