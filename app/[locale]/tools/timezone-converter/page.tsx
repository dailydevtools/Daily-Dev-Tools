import { constructToolMetadata } from '@/app/lib/seo';
import TimezoneConverterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'timezone-converter' });
}

export default function TimezoneConverterPage() {
    return <TimezoneConverterClient />;
}
