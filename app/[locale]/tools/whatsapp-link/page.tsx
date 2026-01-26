import { constructToolMetadata } from '@/app/lib/seo';
import WhatsAppLinkClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'whatsapp-link' });
}

export default function WhatsAppLinkPage() {
    return <WhatsAppLinkClient />;
}
