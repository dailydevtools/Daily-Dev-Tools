import { Metadata } from 'next';
import MetaGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Meta Tag Generator | DailyDevTools',
    description: 'Create SEO meta tags, Open Graph tags, and Twitter Cards code for your website.',
};

export default function MetaGeneratorPage() {
    return <MetaGeneratorClient />;
}
