import { constructToolMetadata } from '@/app/lib/seo';
import UnitConverterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'unit-converter' });
}

export default function UnitConverterPage() {
    return <UnitConverterClient />;
}
