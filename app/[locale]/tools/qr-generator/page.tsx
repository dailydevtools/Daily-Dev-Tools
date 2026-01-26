import { constructToolMetadata } from '@/app/lib/seo';
import QrGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'qr-generator' });
}

export default function QrGeneratorPage() {
    return <QrGeneratorClient />;
}
