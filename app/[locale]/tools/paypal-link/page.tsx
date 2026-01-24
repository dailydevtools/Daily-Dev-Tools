import { Metadata } from 'next';
import PaypalLinkClient from "./Client";

export const metadata: Metadata = {
    title: 'PayPal Link Generator | DailyDevTools',
    description: 'Create custom PayPal payment links with specific amounts and currencies.',
};

export default function PaypalLinkPage() {
    return <PaypalLinkClient />;
}
