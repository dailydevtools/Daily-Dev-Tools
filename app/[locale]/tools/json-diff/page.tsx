import { Metadata } from 'next';
import JsonDiffClient from "./Client";

export const metadata: Metadata = {
    title: 'JSON Diff Tool | DailyDevTools',
    description: 'Compare JSON objects online. Visualize differences between two JSON files.',
};

export default function JsonDiffPage() {
    return <JsonDiffClient />;
}
