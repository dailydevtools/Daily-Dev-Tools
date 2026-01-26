import { constructToolMetadata } from '@/app/lib/seo';
import TimestampConverterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'timestamp-converter' });
}

export default function TimestampConverterPage() {
    return <TimestampConverterClient />;
}
