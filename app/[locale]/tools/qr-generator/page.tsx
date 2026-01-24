import { Metadata } from 'next';
import QrGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'QR Code Generator | DailyDevTools',
    description: 'Create custom QR codes for any URL or text. Customize colors and download.',
};

export default function QrGeneratorPage() {
    return <QrGeneratorClient />;
}
