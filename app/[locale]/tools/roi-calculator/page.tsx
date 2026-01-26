import { constructToolMetadata } from '@/app/lib/seo';
import RoiCalculatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'roi-calculator' });
}

export default function RoiCalculatorPage() {
    return <RoiCalculatorClient />;
}
