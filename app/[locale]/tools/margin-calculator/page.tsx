import { Metadata } from 'next';
import MarginCalculatorClient from "./Client";

export const metadata: Metadata = {
    title: 'Profile Margin Calculator | DailyDevTools',
    description: 'Calculate gross margin, markup, and profit from cost and revenue instantly.',
};

export default function MarginCalculatorPage() {
    return <MarginCalculatorClient />;
}
