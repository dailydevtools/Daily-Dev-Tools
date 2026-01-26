import { constructToolMetadata } from '@/app/lib/seo';
import CronGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'cron-generator' });
}

export default function CronGeneratorPage() {
    return <CronGeneratorClient />;
}
