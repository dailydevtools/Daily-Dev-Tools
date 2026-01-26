import { constructToolMetadata } from '@/app/lib/seo';
import IbanValidatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'iban-validator' });
}

export default function IbanValidatorPage() {
    return <IbanValidatorClient />;
}
