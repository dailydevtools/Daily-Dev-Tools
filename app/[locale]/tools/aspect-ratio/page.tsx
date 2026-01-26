import { constructToolMetadata } from '@/app/lib/seo';
import AspectRatioClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'aspect-ratio' });
}

export default function AspectRatioPage() {
    return <AspectRatioClient />;
}
