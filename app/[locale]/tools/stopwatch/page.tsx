import { Metadata } from 'next';
import StopwatchClient from "./Client";

export const metadata: Metadata = {
    title: 'Stopwatch | DailyDevTools',
    description: 'Precision stopwatch with lap tracking. Millisecond accuracy.',
};

export default function StopwatchPage() {
    return <StopwatchClient />;
}
