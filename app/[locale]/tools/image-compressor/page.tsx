import { Metadata } from 'next';
import ImageCompressorClient from "./Client";

export const metadata: Metadata = {
    title: 'Image Compressor | DailyDevTools',
    description: 'Compress JPG, PNG, and WebP images locally in your browser. Reduce file size without losing quality.',
};

export default function ImageCompressorPage() {
    return <ImageCompressorClient />;
}
