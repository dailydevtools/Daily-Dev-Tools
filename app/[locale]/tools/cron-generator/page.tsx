import { Metadata } from 'next';
import CronGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Cron Generator | DailyDevTools',
    description: 'Create and test cron schedule expressions. Common presets included.',
};

export default function CronGeneratorPage() {
    return <CronGeneratorClient />;
}
