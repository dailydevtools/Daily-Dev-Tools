import { Metadata } from 'next';
import VatCalculatorClient from "./Client";

export const metadata: Metadata = {
    title: 'VAT Calculator | DailyDevTools',
    description: 'Calculate VAT easily. Add or remove tax from amounts instantly.',
};

export default function VatCalculatorPage() {
    return <VatCalculatorClient />;
}
