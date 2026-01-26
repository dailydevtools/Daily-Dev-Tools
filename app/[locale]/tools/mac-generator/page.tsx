import { constructToolMetadata } from '@/app/lib/seo';
import MacGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'mac-generator' });
}

export default function MacGeneratorPage() {
    return <MacGeneratorClient />;
}
