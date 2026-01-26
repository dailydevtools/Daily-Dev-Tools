import { constructToolMetadata } from '@/app/lib/seo';
import CssMinifierClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'css-minifier' });
}

export default function CssMinifierPage() {
    return <CssMinifierClient />;
}
