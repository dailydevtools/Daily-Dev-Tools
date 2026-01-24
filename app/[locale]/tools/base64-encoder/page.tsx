import { Metadata } from 'next';
import Base64EncoderClient from "./Client";

export const metadata: Metadata = {
    title: 'Base64 Encoder/Decoder | DailyDevTools',
    description: 'Encode to Base64 or decode from Base64 instantly. Simple and secure text conversion.',
};

export default function Base64EncoderPage() {
    return <Base64EncoderClient />;
}
