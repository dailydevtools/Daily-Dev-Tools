import { constructToolMetadata } from '@/app/lib/seo';
import LoanCalculatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'loan-calculator' });
}

export default function LoanCalculatorPage() {
    return <LoanCalculatorClient />;
}
