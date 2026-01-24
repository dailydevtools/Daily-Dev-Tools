import { Metadata } from 'next';
import PasswordManagerClient from "./Client";

export const metadata: Metadata = {
    title: 'Password Manager (Local) | DailyDevTools',
    description: 'Secure, offline password manager. Encrypts your data locally in your browser.',
};

export default function PasswordManagerPage() {
    return <PasswordManagerClient />;
}
