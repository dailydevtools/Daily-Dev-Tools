import { constructToolMetadata } from '@/app/lib/seo';
import DeepLinkTesterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'deep-link-tester' });
}

export default function DeepLinkTesterPage() {
    return <DeepLinkTesterClient />;
}
