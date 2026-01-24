import { Metadata } from 'next';
import CipherToolsClient from "./Client";

export const metadata: Metadata = {
    title: 'Cipher Tools | DailyDevTools',
    description: 'Encrypt and decrypt text using Caesar Cipher, ROT13, and shift ciphers.',
};

export default function CipherToolsPage() {
    return <CipherToolsClient />;
}
