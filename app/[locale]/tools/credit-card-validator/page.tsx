import { constructToolMetadata } from '@/app/lib/seo';
import CreditCardValidatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'credit-card-validator' });
}

export default function CreditCardValidatorPage() {
    return <CreditCardValidatorClient />;
}
