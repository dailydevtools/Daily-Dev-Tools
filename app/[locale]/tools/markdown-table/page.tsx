import { constructToolMetadata } from '@/app/lib/seo';
import MarkdownTableClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'markdown-table' });
}

export default function MarkdownTablePage() {
    return <MarkdownTableClient />;
}
