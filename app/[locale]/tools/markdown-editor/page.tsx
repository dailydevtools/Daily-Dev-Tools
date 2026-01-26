import { constructToolMetadata } from '@/app/lib/seo';
import MarkdownEditorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'markdown-editor' });
}

export default function MarkdownEditorPage() {
    return <MarkdownEditorClient />;
}
