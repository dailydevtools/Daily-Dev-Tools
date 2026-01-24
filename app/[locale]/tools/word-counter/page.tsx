import { Metadata } from 'next';
import WordCounterClient from "./Client";

export const metadata: Metadata = {
    title: 'Word Counter | DailyDevTools',
    description: 'Free online word counter and character counter. Calculate reading time.',
};

export default function WordCounterPage() {
    return <WordCounterClient />;
}
