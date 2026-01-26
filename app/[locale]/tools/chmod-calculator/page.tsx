import { constructToolMetadata } from '@/app/lib/seo';
import ChmodCalculatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'chmod-calculator' });
}

export default function ChmodCalculatorPage() {
    return <ChmodCalculatorClient />;
}
