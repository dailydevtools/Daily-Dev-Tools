import { constructToolMetadata } from '@/app/lib/seo';
import CrontabGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'crontab-generator' });
}

export default function CrontabGeneratorPage() {
    return <CrontabGeneratorClient />;
}
