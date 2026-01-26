import { constructToolMetadata } from '@/app/lib/seo';
import SlugGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'slug-generator' });
}

export default function SlugGeneratorPage() {
    return <SlugGeneratorClient />;
}
