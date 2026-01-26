import { constructToolMetadata } from '@/app/lib/seo';
import CssCursorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'css-cursor' });
}

export default function CssCursorPage() {
    return <CssCursorClient />;
}
