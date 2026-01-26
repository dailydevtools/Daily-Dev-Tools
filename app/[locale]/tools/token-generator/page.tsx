import { constructToolMetadata } from '@/app/lib/seo';
import TokenGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'token-generator' });
}

export default function TokenGeneratorPage() {
    return <TokenGeneratorClient />;
}
