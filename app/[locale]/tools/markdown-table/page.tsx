import { Metadata } from 'next';
import MarkdownTableClient from "./Client";

export const metadata: Metadata = {
    title: 'Markdown Table Generator | DailyDevTools',
    description: 'Create markdown tables easily with a visual editor. Copy paste into your README or docs.',
};

export default function MarkdownTablePage() {
    return <MarkdownTableClient />;
}
