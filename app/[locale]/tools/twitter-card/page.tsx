import { constructToolMetadata } from '@/app/lib/seo';
import TwitterCardClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'twitter-card' });
}

export default function TwitterCardPage() {
    return <TwitterCardClient />;
}
