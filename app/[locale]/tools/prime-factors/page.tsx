import { constructToolMetadata } from '@/app/lib/seo';
import PrimeFactorsClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'prime-factors' });
}

export default function PrimeFactorsPage() {
    return <PrimeFactorsClient />;
}
