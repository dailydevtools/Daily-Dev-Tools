import { constructToolMetadata } from '@/app/lib/seo';
import HtpasswdGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'htpasswd-generator' });
}

export default function HtpasswdGeneratorPage() {
    return <HtpasswdGeneratorClient />;
}
