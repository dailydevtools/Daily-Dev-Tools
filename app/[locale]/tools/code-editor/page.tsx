import { constructToolMetadata } from '@/app/lib/seo';
import CodeEditorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'code-editor' });
}

export default function CodeEditorPage() {
    return <CodeEditorClient />;
}
