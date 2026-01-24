import { Metadata } from 'next';
import TokenGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Random Token Generator | DailyDevTools',
    description: 'Generate secure random tokens, API keys, and passwords with custom length.',
};

export default function TokenGeneratorPage() {
    return <TokenGeneratorClient />;
}
