import { constructToolMetadata } from '@/app/lib/seo';
import InterestCalculatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'interest-calculator' });
}

export default function InterestCalculatorPage() {
    return <InterestCalculatorClient />;
}
