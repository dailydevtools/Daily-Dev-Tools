import { Metadata } from 'next';
import JWTDecoderClient from "./Client";

export const metadata: Metadata = {
    title: 'JWT Decoder | DailyDevTools',
    description: 'Decode and debug JWT (JSON Web Tokens) online. View header and payload securely.',
};

export default function JWTDecoderPage() {
    return <JWTDecoderClient />;
}
