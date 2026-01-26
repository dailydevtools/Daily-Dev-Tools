import { constructToolMetadata } from '@/app/lib/seo';
import ImageConverterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'image-converter' });
}

export default function ImageConverterPage() {
    return <ImageConverterClient />;
}
