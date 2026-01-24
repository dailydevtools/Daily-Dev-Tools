import { Metadata } from 'next';
import HashGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Hash Generator | DailyDevTools',
    description: 'Online Hash Generator. Create SHA-1, SHA-256, SHA-384, and SHA-512 hashes from your string text.',
};

export default function HashGeneratorPage() {
    return <HashGeneratorClient />;
}
