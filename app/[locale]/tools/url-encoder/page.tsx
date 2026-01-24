import { Metadata } from 'next';
import URLEncoderClient from "./Client";

export const metadata: Metadata = {
    title: 'URL Encoder / Decoder | DailyDevTools',
    description: 'Online URL Encoder and Decoder. Percent-encode or decode URL strings.',
};

export default function URLEncoderPage() {
    return <URLEncoderClient />;
}
