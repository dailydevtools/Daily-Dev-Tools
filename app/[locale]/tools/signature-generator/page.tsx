import { constructToolMetadata } from '@/app/lib/seo';
import SignatureGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'signature-generator' });
}

export default function SignatureGeneratorPage() {
    return <SignatureGeneratorClient />;
}
