import { constructToolMetadata } from '@/app/lib/seo';
import HtmlEncoderClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'html-encoder' });
}

export default function HtmlEncoderPage() {
    return <HtmlEncoderClient />;
}
