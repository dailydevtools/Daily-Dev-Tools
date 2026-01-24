import { Metadata } from 'next';
import SpeechToTextClient from "./Client";

export const metadata: Metadata = {
    title: 'Speech to Text Converter | DailyDevTools',
    description: 'Dictate notes easily using Speech to Text using browser APIs.',
};

export default function SpeechToTextPage() {
    return <SpeechToTextClient />;
}
