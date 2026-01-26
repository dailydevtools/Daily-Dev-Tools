import { constructToolMetadata } from '@/app/lib/seo';
import TextToolsClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'text-tools' });
}

export default function TextToolsPage() {
    return <TextToolsClient />;
}
