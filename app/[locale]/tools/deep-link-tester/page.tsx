import { Metadata } from 'next';
import DeepLinkTesterClient from "./Client";

export const metadata: Metadata = {
    title: 'Deep Link Tester | DailyDevTools',
    description: 'Test and debug deep links (URL schemes) for your mobile apps. Launch directly or generate QR codes.',
};

export default function DeepLinkTesterPage() {
    return <DeepLinkTesterClient />;
}
