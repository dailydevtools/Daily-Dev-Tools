import { Metadata } from 'next';
import TextToolsClient from "./Client";

export const metadata: Metadata = {
    title: 'Text Tools | DailyDevTools',
    description: 'A suite of text manipulation tools: reverse, flip upside down, binary converter, and more.',
};

export default function TextToolsPage() {
    return <TextToolsClient />;
}
