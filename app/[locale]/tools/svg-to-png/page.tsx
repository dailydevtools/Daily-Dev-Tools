import { constructToolMetadata } from '@/app/lib/seo';
import SvgToPngClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'svg-to-png' });
}

export default function SvgToPngPage() {
    return <SvgToPngClient />;
}
