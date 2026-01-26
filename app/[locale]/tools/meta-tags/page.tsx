import { constructToolMetadata } from '@/app/lib/seo';
import MetaTagsClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'meta-tags' });
}

export default function MetaTagsPage() {
    return <MetaTagsClient />;
}
