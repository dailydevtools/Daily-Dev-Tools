import { constructToolMetadata } from '@/app/lib/seo';
import JsonCsvConverterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'json-converter' });
}

export default function JsonConverterPage() {
    return <JsonCsvConverterClient />;
}
