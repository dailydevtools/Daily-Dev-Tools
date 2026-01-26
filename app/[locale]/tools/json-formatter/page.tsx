import { constructToolMetadata } from '@/app/lib/seo';
import JSONFormatterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'json-formatter' });
}

export default function JSONFormatterPage() {
    return <JSONFormatterClient />;
}
