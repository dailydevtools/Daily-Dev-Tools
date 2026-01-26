import { constructToolMetadata } from '@/app/lib/seo';
import DiscountCalculatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'discount-calculator' });
}

export default function DiscountCalculatorPage() {
    return <DiscountCalculatorClient />;
}
