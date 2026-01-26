import { constructToolMetadata } from '@/app/lib/seo';
import TextDiffClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'text-diff' });
}

export default function TextDiffPage() {
    return <TextDiffClient />;
}
