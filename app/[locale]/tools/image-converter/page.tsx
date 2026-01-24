import { Metadata } from 'next';
import ImageConverterClient from "./Client";

export const metadata: Metadata = {
    title: 'Image Converter | DailyDevTools',
    description: 'Convert images to different formats (WebP, JPG, PNG) directly in your browser.',
};

export default function ImageConverterPage() {
    return <ImageConverterClient />;
}
