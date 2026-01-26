import { constructToolMetadata } from '@/app/lib/seo';
import Base64EncoderClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'base64-encoder' });
}

export default function Base64EncoderPage() {
    return <Base64EncoderClient />;
}
