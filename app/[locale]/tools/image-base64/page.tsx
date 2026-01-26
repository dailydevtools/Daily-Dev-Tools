import { constructToolMetadata } from '@/app/lib/seo';
import ImageBase64Client from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'image-base64' });
}

export default function ImageBase64Page() {
    return <ImageBase64Client />;
}
