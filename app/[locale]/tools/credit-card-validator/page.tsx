import { Metadata } from 'next';
import CreditCardValidatorClient from "./Client";

export const metadata: Metadata = {
    title: 'Credit Card Validator | DailyDevTools',
    description: 'Validate credit card numbers safely using the Luhn algorithm. Identify card issuers like Visa, Mastercard, and Amex.',
};

export default function CreditCardValidatorPage() {
    return <CreditCardValidatorClient />;
}
