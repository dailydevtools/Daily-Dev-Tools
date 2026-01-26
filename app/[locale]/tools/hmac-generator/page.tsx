import { constructToolMetadata } from '@/app/lib/seo';
import HmacGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'hmac-generator' });
}

export default function HmacGeneratorPage() {
    return <HmacGeneratorClient />;
}
