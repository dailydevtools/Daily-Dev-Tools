import { Metadata } from 'next';
import ImageBase64Client from "./Client";

export const metadata: Metadata = {
    title: 'Image to Base64 Converter | DailyDevTools',
    description: 'Convert images to Base64 strings for embedding in HTML/CSS, or decode Base64 back to images.',
};

export default function ImageBase64Page() {
    return <ImageBase64Client />;
}
