import { Metadata } from 'next';
import GridGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'CSS Grid Generator | DailyDevTools',
    description: 'Visual CSS Grid generator. Create responsive grid layouts and copy code instantly.',
};

export default function GridGeneratorPage() {
    return <GridGeneratorClient />;
}
