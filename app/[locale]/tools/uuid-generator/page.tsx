import { Metadata } from 'next';
import UuidGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'UUID Generator | DailyDevTools',
    description: 'Generate version 4 UUIDs instantly. Copy one or all keys to clipboard.',
};

export default function UuidGeneratorPage() {
    return <UuidGeneratorClient />;
}
