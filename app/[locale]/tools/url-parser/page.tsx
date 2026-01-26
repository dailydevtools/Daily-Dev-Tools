import { constructToolMetadata } from '@/app/lib/seo';
import UrlParserClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'url-parser' });
}

export default function UrlParserPage() {
    return <UrlParserClient />;
}
