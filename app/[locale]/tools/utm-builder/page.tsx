import { constructToolMetadata } from '@/app/lib/seo';
import UtmBuilderClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'utm-builder' });
}

export default function UtmBuilderPage() {
    return <UtmBuilderClient />;
}
