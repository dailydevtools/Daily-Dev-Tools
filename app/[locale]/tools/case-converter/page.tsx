import { constructToolMetadata } from '@/app/lib/seo';
import CaseConverterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'case-converter' });
}

export default function CaseConverterPage() {
    return <CaseConverterClient />;
}
