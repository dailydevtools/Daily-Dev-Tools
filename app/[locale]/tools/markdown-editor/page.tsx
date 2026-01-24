import { Metadata } from 'next';
import MarkdownEditorClient from "./Client";

export const metadata: Metadata = {
    title: 'Markdown Editor | DailyDevTools',
    description: 'Online Markdown Editor with live preview. Write and edit markdown files effortlessly.',
};

export default function MarkdownEditorPage() {
    return <MarkdownEditorClient />;
}
