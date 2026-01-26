import { constructToolMetadata } from '@/app/lib/seo';
import PaypalLinkClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'paypal-link' });
}

export default function PaypalLinkPage() {
    return <PaypalLinkClient />;
}
