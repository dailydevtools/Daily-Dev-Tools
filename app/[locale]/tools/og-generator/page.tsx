import { Metadata } from 'next';
import OgGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Open Graph Generator | DailyDevTools',
    description: 'Create preview-ready Open Graph meta tags for Facebook, Twitter, LinkedIn, and more.',
};

export default function OgGeneratorPage() {
    return <OgGeneratorClient />;
}
