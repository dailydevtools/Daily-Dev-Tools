import { constructToolMetadata } from '@/app/lib/seo';
import FuelCalculatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'fuel-calculator' });
}

export default function FuelCalculatorPage() {
    return <FuelCalculatorClient />;
}
