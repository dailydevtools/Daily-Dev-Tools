import { Metadata } from 'next';
import TextToSpeechClient from "./Client";

export const metadata: Metadata = {
    title: 'Text to Speech | DailyDevTools',
    description: 'Online text to speech converter (TTS). Choose from various voices and languages.',
};

export default function TextToSpeechPage() {
    return <TextToSpeechClient />;
}
