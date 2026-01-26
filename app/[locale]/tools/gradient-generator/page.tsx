import { constructToolMetadata } from '@/app/lib/seo';
import GradientGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'gradient-generator' });
}

export default function GradientGeneratorPage() {
    return <GradientGeneratorClient />;
}
