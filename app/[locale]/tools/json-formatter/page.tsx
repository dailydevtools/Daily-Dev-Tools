import { Metadata } from 'next';
import JSONFormatterClient from "./Client";

export const metadata: Metadata = {
    title: 'JSON Formatter & Validator | DailyDevTools',
    description: 'Format, validate, minfiy and beautify JSON data. Free online JSON formatter tool.',
};

export default function JSONFormatterPage() {
    return <JSONFormatterClient />;
}
