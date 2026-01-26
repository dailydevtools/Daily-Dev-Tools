import { constructToolMetadata } from '@/app/lib/seo';
import PasswordGeneratorClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'password-generator' });
}

export default function PasswordGeneratorPage() {
    return <PasswordGeneratorClient />;
}
