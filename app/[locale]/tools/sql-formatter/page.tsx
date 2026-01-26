import { constructToolMetadata } from '@/app/lib/seo';
import SqlFormatterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'sql-formatter' });
}

export default function SqlFormatterPage() {
    return <SqlFormatterClient />;
}
