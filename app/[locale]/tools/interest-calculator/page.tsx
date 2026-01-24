import { Metadata } from 'next';
import InterestCalculatorClient from "./Client";

export const metadata: Metadata = {
    title: 'Interest Calculator | DailyDevTools',
    description: 'Calculate simple and compound interest. Visualise growth of your investments over time.',
};

export default function InterestCalculatorPage() {
    return <InterestCalculatorClient />;
}