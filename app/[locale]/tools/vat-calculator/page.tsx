import { constructToolMetadata } from '@/app/lib/seo';
import VatCalculatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'vat-calculator' });
}

export default function VatCalculatorPage() {
    return <VatCalculatorClient />;
}
