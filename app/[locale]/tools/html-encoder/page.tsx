import { Metadata } from 'next';
import HtmlEncoderClient from "./Client";

export const metadata: Metadata = {
    title: 'HTML Encoder / Decoder | DailyDevTools',
    description: 'Encode and decode HTML characters to HTML entities. Prevent XSS by escaping special characters.',
};

export default function HtmlEncoderPage() {
    return <HtmlEncoderClient />;
}
