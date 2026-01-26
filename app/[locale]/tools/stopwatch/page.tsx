import { constructToolMetadata } from '@/app/lib/seo';
import StopwatchClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'stopwatch' });
}

export default function StopwatchPage() {
    return <StopwatchClient />;
}
