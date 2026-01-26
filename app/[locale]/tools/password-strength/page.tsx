import { constructToolMetadata } from '@/app/lib/seo';
import PasswordStrengthClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'password-strength' });
}

export default function PasswordStrengthPage() {
    return <PasswordStrengthClient />;
}
