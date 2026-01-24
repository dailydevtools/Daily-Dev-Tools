import { Metadata } from 'next';
import YTThumbnailClient from "./Client";

export const metadata: Metadata = {
    title: 'YouTube Thumbnail Downloader | DailyDevTools',
    description: 'Download YouTube video thumbnails in HD, SD and HQ quality.',
};

export default function YTThumbnailPage() {
    return <YTThumbnailClient />;
}
