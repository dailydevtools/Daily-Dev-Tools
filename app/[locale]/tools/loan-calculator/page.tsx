import { Metadata } from 'next';
import LoanCalculatorClient from "./Client";

export const metadata: Metadata = {
    title: 'Loan Calculator | DailyDevTools',
    description: 'Calculate monthly payments and total interest for mortgages, auto loans, and personal loans.',
};

export default function LoanCalculatorPage() {
    return <LoanCalculatorClient />;
}
