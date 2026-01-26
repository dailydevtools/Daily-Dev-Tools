import { constructToolMetadata } from '@/app/lib/seo';
import PasswordManagerClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'password-manager' });
}

export default function PasswordManagerPage() {
    return <PasswordManagerClient />;
}
