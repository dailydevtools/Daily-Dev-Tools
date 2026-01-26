import { constructToolMetadata } from '@/app/lib/seo';
import DNSLookupClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'dns-lookup' });
}

export default function DNSLookupPage() {
    return <DNSLookupClient />;
}
