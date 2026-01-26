import { constructToolMetadata } from '@/app/lib/seo';
import AgeCalculatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'age-calculator' });
}

export default function AgeCalculatorPage() {
    return <AgeCalculatorClient />;
}
