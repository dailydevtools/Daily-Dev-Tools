import { constructToolMetadata } from '@/app/lib/seo';
import CipherToolsClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'cipher-tools' });
}

export default function CipherToolsPage() {
    return <CipherToolsClient />;
}
