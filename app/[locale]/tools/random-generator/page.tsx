import { Metadata } from 'next';
import RandomGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Random Generator Suite | DailyDevTools',
    description: 'Generate random numbers, flip coins, or pick random items from a list.',
};

export default function RandomGeneratorPage() {
    return <RandomGeneratorClient />;
}
