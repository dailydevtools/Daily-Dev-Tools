import { constructToolMetadata } from '@/app/lib/seo';
import OgGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'og-generator' });
}

export default function OgGeneratorPage() {
    return <OgGeneratorClient />;
}
