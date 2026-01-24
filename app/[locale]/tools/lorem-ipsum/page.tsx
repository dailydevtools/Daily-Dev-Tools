import { Metadata } from 'next';
import LoremIpsumClient from "./Client";

export const metadata: Metadata = {
    title: 'Lorem Ipsum Generator | DailyDevTools',
    description: 'Generate standard Lorem Ipsum placeholder text for your designs. Adjustable paragraph count.',
};

export default function LoremIpsumPage() {
    return <LoremIpsumClient />;
}
