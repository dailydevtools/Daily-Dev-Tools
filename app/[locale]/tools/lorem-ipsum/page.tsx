import { constructToolMetadata } from '@/app/lib/seo';
import LoremIpsumClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'lorem-ipsum' });
}

export default function LoremIpsumPage() {
    return <LoremIpsumClient />;
}
