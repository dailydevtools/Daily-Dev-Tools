import { Metadata } from 'next';
import PasswordStrengthClient from "./Client";

export const metadata: Metadata = {
    title: 'Password Strength Checker | DailyDevTools',
    description: 'Check if your password is secure enough. Analyze complexity and entropy.',
};

export default function PasswordStrengthPage() {
    return <PasswordStrengthClient />;
}
