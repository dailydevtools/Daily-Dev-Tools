import { constructToolMetadata } from '@/app/lib/seo';
import JWTDecoderClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'jwt-decoder' });
}

export default function JWTDecoderPage() {
    return <JWTDecoderClient />;
}
