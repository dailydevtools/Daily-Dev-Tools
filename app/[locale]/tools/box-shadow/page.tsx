import { constructToolMetadata } from '@/app/lib/seo';
import BoxShadowGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'box-shadow' });
}

export default function BoxShadowGeneratorPage() {
    return <BoxShadowGeneratorClient />;
}
