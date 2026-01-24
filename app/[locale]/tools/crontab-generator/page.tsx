import { Metadata } from 'next';
import CrontabGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Crontab Generator | DailyDevTools',
    description: 'Generate crontab syntax for scheduling recurring tasks on Unix-like operating systems.',
};

export default function CrontabGeneratorPage() {
    return <CrontabGeneratorClient />;
}
