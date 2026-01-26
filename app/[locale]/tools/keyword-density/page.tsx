import { constructToolMetadata } from '@/app/lib/seo';
import KeywordDensityClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'keyword-density' });
}

export default function KeywordDensityPage() {
    return <KeywordDensityClient />;
}
