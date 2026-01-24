import { Metadata } from 'next';
import MetaTagsClient from "./Client";

export const metadata: Metadata = {
    title: 'Simple Meta Tags | DailyDevTools',
    description: 'Basic HTML Header generator. Title, description and viewport tag generation.',
};

export default function MetaTagsPage() {
    return <MetaTagsClient />;
}
