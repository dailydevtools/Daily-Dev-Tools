import { Metadata } from 'next';
import AgeCalculatorClient from "./Client";

export const metadata: Metadata = {
    title: 'Age Calculator | DailyDevTools',
    description: 'Calculate your exact age in years, months, and days. Find out when your next birthday is.',
};

export default function AgeCalculatorPage() {
    return <AgeCalculatorClient />;
}
