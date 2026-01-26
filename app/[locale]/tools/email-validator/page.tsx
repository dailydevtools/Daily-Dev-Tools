import { constructToolMetadata } from '@/app/lib/seo';
import EmailValidatorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'email-validator' });
}

export default function EmailValidatorPage() {
    return <EmailValidatorClient />;
}
