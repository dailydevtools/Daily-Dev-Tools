import { constructToolMetadata } from '@/app/lib/seo';
import VibrationTesterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'vibration-tester' });
}

export default function VibrationTesterPage() {
    return <VibrationTesterClient />;
}
