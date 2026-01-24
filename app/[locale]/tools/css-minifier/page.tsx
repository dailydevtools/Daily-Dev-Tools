import { Metadata } from 'next';
import CssMinifierClient from "./Client";

export const metadata: Metadata = {
    title: 'CSS Minifier | DailyDevTools',
    description: 'Compress and optimize CSS code to reduce file size. Free online CSS mnifier tool.',
};

export default function CssMinifierPage() {
    return <CssMinifierClient />;
}
