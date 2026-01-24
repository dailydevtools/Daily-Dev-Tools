import { Metadata } from 'next';
import TextDiffClient from "./Client";

export const metadata: Metadata = {
    title: 'Text Diff Checker | DailyDevTools',
    description: 'Compare two text files or code snippets to find differences.',
};

export default function TextDiffPage() {
    return <TextDiffClient />;
}
