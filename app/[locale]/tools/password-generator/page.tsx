import { Metadata } from 'next';
import PasswordGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Password Generator | DailyDevTools',
    description: 'Create secure, random passwords instantly. customizable length and character sets.',
};

export default function PasswordGeneratorPage() {
    return <PasswordGeneratorClient />;
}
