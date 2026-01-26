import { constructToolMetadata } from '@/app/lib/seo';
import BMICalculatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'bmi-calculator' });
}

export default function BMICalculatorPage() {
    return <BMICalculatorClient />;
}
