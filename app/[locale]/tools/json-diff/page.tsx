import { constructToolMetadata } from '@/app/lib/seo';
import JsonDiffClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'json-diff' });
}

export default function JsonDiffPage() {
    return <JsonDiffClient />;
}
