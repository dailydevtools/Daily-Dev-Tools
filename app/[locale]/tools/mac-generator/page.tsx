import { Metadata } from 'next';
import MacGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'MAC Address Generator | DailyDevTools',
    description: 'Generate random MAC addresses with custom formats (Colon, Dash, Dot) and case options.',
};

export default function MacGeneratorPage() {
    return <MacGeneratorClient />;
}
