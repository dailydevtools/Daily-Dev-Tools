import { constructToolMetadata } from '@/app/lib/seo';
import AsciiConverterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'ascii-converter' });
}

export default function AsciiConverterPage() {
    return <AsciiConverterClient />;
}
