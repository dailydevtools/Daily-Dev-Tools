import { Metadata } from 'next';
import RobotsGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Robots.txt Generator | DailyDevTools',
    description: 'Create a robots.txt file for your website to manage crawler access.',
};

export default function RobotsGeneratorPage() {
    return <RobotsGeneratorClient />;
}
