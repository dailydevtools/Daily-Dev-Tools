import { constructToolMetadata } from '@/app/lib/seo';
import RandomGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'random-generator' });
}

export default function RandomGeneratorPage() {
    return <RandomGeneratorClient />;
}
