import { constructToolMetadata } from '@/app/lib/seo';
import SpeechToTextClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'speech-to-text' });
}

export default function SpeechToTextPage() {
    return <SpeechToTextClient />;
}
