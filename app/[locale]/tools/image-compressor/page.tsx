import { constructToolMetadata } from '@/app/lib/seo';
import ImageCompressorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'image-compressor' });
}

export default function ImageCompressorPage() {
    return <ImageCompressorClient />;
}
