import { Metadata } from 'next';
import UrlParserClient from "./Client";

export const metadata: Metadata = {
    title: 'URL Parser | DailyDevTools',
    description: 'Parse URL strings related to specific hostnames, paths, and query parameters.',
};

export default function UrlParserPage() {
    return <UrlParserClient />;
}
