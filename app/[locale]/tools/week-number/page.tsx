import { Metadata } from 'next';
import WeekNumberClient from "./Client";

export const metadata: Metadata = {
    title: 'Week Number Calculator | DailyDevTools',
    description: 'Find the current week number. Calculate week number from date.',
};

export default function WeekNumberPage() {
    return <WeekNumberClient />;
}
