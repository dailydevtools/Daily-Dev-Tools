import { Metadata } from 'next';
import KeywordDensityClient from "./Client";

export const metadata: Metadata = {
    title: 'Keyword Density Checker | DailyDevTools',
    description: 'Check keyword frequency and density in your text content for SEO analysis.',
};

export default function KeywordDensityPage() {
    return <KeywordDensityClient />;
}
