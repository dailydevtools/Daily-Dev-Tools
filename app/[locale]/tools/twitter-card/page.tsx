import { Metadata } from 'next';
import TwitterCardClient from "./Client";

export const metadata: Metadata = {
    title: 'Twitter Card Generator | DailyDevTools',
    description: 'Create preview-ready Twitter Card meta tags for better social sharing.',
};

export default function TwitterCardPage() {
    return <TwitterCardClient />;
}
