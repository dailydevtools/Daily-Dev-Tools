import { constructToolMetadata } from '@/app/lib/seo';
import WordCounterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'word-counter' });
}

export default function WordCounterPage() {
    return <WordCounterClient />;
}
