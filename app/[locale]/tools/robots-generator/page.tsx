import { constructToolMetadata } from '@/app/lib/seo';
import RobotsGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'robots-generator' });
}

export default function RobotsGeneratorPage() {
    return <RobotsGeneratorClient />;
}
