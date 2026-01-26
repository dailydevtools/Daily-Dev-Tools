import { constructToolMetadata } from '@/app/lib/seo';
import SubnetCalculatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'subnet-calculator' });
}

export default function SubnetCalculatorPage() {
    return <SubnetCalculatorClient />;
}
