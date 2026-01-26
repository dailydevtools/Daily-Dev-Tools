import { constructToolMetadata } from '@/app/lib/seo';
import PrettyPrintUrlClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'pretty-print-url' });
}

export default function PrettyPrintUrlPage() {
    return <PrettyPrintUrlClient />;
}
