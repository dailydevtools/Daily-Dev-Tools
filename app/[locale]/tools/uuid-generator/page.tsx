import { constructToolMetadata } from '@/app/lib/seo';
import UuidGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'uuid-generator' });
}

export default function UuidGeneratorPage() {
    return <UuidGeneratorClient />;
}
