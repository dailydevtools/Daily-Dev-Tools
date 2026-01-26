import { constructToolMetadata } from '@/app/lib/seo';
import FaviconGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'favicon-generator' });
}

export default function FaviconGeneratorPage() {
    return <FaviconGeneratorClient />;
}
