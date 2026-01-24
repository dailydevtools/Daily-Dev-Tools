import { Metadata } from 'next';
import PrettyPrintUrlClient from "./Client";

export const metadata: Metadata = {
    title: 'Pretty Print URL | DailyDevTools',
    description: 'Format complex URLs into a readable, structured format with separated query parameters.',
};

export default function PrettyPrintUrlPage() {
    return <PrettyPrintUrlClient />;
}
