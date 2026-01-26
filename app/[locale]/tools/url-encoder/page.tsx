import { constructToolMetadata } from '@/app/lib/seo';
import URLEncoderClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'url-encoder' });
}

export default function URLEncoderPage() {
    return <URLEncoderClient />;
}
