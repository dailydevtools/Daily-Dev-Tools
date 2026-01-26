import { constructToolMetadata } from '@/app/lib/seo';
import WeekNumberClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'week-number' });
}

export default function WeekNumberPage() {
    return <WeekNumberClient />;
}
