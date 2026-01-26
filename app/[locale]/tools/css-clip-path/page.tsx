import { constructToolMetadata } from '@/app/lib/seo';
import CssClipPathClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'css-clip-path' });
}

export default function CssClipPathPage() {
    return <CssClipPathClient />;
}
