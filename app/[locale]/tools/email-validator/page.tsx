import { Metadata } from 'next';
import EmailValidatorClient from "./Client";

export const metadata: Metadata = {
    title: 'Email Validator | DailyDevTools',
    description: 'Verify email address format and check for common typos like @gnail.com.',
};

export default function EmailValidatorPage() {
    return <EmailValidatorClient />;
}
