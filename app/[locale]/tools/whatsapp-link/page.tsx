import { Metadata } from 'next';
import WhatsAppLinkClient from "./Client";

export const metadata: Metadata = {
    title: 'WhatsApp Link Generator | DailyDevTools',
    description: 'WhatsApp Direct Link Generator - Create links to chat without saving numbers.',
};

export default function WhatsAppLinkPage() {
    return <WhatsAppLinkClient />;
}
