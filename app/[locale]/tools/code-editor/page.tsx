import { Metadata } from 'next';
import CodeEditorClient from "./Client";

export const metadata: Metadata = {
    title: 'Code Editor & Formatter | DailyDevTools',
    description: 'View, edit, and format code in various programming languages. Free online code editor with syntax highlighting.',
};

export default function CodeEditorPage() {
    return <CodeEditorClient />;
}
