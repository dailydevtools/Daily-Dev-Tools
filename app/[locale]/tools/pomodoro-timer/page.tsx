import { Metadata } from 'next';
import PomodoroTimerClient from "./Client";

export const metadata: Metadata = {
    title: 'Pomodoro Timer | DailyDevTools',
    description: 'Boost productivity with this Pomodoro timer. Customizable work and break intervals.',
};

export default function PomodoroTimerPage() {
    return <PomodoroTimerClient />;
}
