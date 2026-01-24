import { Metadata } from 'next';
import DateDiffClient from "./Client";

export const metadata: Metadata = {
    title: 'Date Difference Calculator | DailyDevTools',
    description: 'Calculate the duration between two dates in years, months, days, and more.',
};

export default function DateDiffPage() {
    return <DateDiffClient />;
}
