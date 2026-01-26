import { constructToolMetadata } from '@/app/lib/seo';
import PomodoroTimerClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'pomodoro-timer' });
}

export default function PomodoroTimerPage() {
    return <PomodoroTimerClient />;
}
