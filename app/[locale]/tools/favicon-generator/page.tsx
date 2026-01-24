import { Metadata } from 'next';
import FaviconGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Favicon Generator | DailyDevTools',
    description: 'Convert any image into a favicon for your website. Generates standard 32x32 PNG favicons.',
};

export default function FaviconGeneratorPage() {
    return <FaviconGeneratorClient />;
}
