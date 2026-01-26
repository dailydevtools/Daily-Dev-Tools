import { constructToolMetadata } from '@/app/lib/seo';
import MarginCalculatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'margin-calculator' });
}

export default function MarginCalculatorPage() {
    return <MarginCalculatorClient />;
}
