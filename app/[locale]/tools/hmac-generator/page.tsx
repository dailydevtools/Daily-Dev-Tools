import { Metadata } from 'next';
import HmacGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'HMAC Generator | DailyDevTools',
    description: 'Calculate HMAC (Hash-based Message Authentication Code) using SHA-256, SHA-512, and more.',
};

export default function HmacGeneratorPage() {
    return <HmacGeneratorClient />;
}
