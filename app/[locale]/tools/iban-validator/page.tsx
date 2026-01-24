import { Metadata } from 'next';
import IbanValidatorClient from "./Client";

export const metadata: Metadata = {
    title: 'IBAN Validator | DailyDevTools',
    description: 'Validate IBAN (International Bank Account Number) for correctness. Offline processing.',
};

export default function IbanValidatorPage() {
    return <IbanValidatorClient />;
}
