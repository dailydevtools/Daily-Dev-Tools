import { Metadata } from 'next';
import SignatureGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Signature Generator | DailyDevTools',
    description: 'Draw your signature online and download as a transparent PNG.',
};

export default function SignatureGeneratorPage() {
    return <SignatureGeneratorClient />;
}
