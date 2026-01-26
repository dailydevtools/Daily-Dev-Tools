import { constructToolMetadata } from '@/app/lib/seo';
import TextToSpeechClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'text-to-speech' });
}

export default function TextToSpeechPage() {
    return <TextToSpeechClient />;
}
