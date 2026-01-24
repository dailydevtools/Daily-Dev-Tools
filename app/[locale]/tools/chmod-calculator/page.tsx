import { Metadata } from 'next';
import ChmodCalculatorClient from "./Client";

export const metadata: Metadata = {
    title: 'Chmod Calculator | DailyDevTools',
    description: 'Calculate Linux/Unix file permissions (chmod). Numeric and symbolic representation.',
};

export default function ChmodCalculatorPage() {
    return <ChmodCalculatorClient />;
}
