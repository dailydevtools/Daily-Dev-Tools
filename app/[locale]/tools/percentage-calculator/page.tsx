import { constructToolMetadata } from '@/app/lib/seo';
import PercentageCalculatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'percentage-calculator' });
}

export default function PercentageCalculatorPage() {
    return <PercentageCalculatorClient />;
}
