import { constructToolMetadata } from '@/app/lib/seo';
import YTThumbnailClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'yt-thumbnail' });
}

export default function YTThumbnailPage() {
    return <YTThumbnailClient />;
}
