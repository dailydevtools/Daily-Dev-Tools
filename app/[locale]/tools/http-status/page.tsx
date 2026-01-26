import { constructToolMetadata } from '@/app/lib/seo';
import HttpStatusClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'http-status' });
}

export default function HttpStatusPage() {
    return <HttpStatusClient />;
}
