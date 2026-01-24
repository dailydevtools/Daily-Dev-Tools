import { Metadata } from 'next';
import SlugGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'URL Slug Generator | DailyDevTools',
    description: 'Convert text to clean URL slugs. SEO friendly URL generator.',
};

export default function SlugGeneratorPage() {
    return <SlugGeneratorClient />;
}
