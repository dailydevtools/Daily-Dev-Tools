import { constructToolMetadata } from '@/app/lib/seo';
import GridGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'grid-generator' });
}

export default function GridGeneratorPage() {
    return <GridGeneratorClient />;
}
