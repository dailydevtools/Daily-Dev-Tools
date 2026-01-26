import { constructToolMetadata } from '@/app/lib/seo';
import SqlToJsonClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'sql-to-json' });
}

export default function SqlToJsonPage() {
    return <SqlToJsonClient />;
}
