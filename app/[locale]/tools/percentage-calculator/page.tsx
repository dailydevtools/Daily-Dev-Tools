import { Metadata } from 'next';
import PercentageCalculatorClient from "./Client";

export const metadata: Metadata = {
    title: 'Percentage Calculator | DailyDevTools',
    description: 'Free online percentage calculator. Calculate increase, decrease, and percentage of numbers.',
};

export default function PercentageCalculatorPage() {
    return <PercentageCalculatorClient />;
}
