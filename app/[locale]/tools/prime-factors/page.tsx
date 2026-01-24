import { Metadata } from 'next';
import PrimeFactorsClient from "./Client";

export const metadata: Metadata = {
    title: 'Prime Factors Calculator | DailyDevTools',
    description: 'Find prime factors of any number. Check if a number is prime or composite instantly.',
};

export default function PrimeFactorsPage() {
    return <PrimeFactorsClient />;
}
