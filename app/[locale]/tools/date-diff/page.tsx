import { constructToolMetadata } from '@/app/lib/seo';
import DateDiffClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'date-diff' });
}

export default function DateDiffPage() {
    return <DateDiffClient />;
}
