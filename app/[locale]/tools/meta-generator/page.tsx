import { constructToolMetadata } from '@/app/lib/seo';
import MetaGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'meta-generator' });
}

export default function MetaGeneratorPage() {
    return <MetaGeneratorClient />;
}
