import { constructToolMetadata } from '@/app/lib/seo';
import ColorConverterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'color-converter' });
}

export default function ColorConverterPage() {
    return <ColorConverterClient />;
}
