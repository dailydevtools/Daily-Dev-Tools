import { constructToolMetadata } from '@/app/lib/seo';
import CssTriangleClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'css-triangle' });
}

export default function CssTrianglePage() {
    return <CssTriangleClient />;
}
