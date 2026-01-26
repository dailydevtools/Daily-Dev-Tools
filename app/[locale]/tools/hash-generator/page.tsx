import { constructToolMetadata } from '@/app/lib/seo';
import HashGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'hash-generator' });
}

export default function HashGeneratorPage() {
    return <HashGeneratorClient />;
}
