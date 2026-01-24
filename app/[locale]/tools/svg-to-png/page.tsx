import { Metadata } from 'next';
import SvgToPngClient from "./Client";

export const metadata: Metadata = {
    title: 'SVG to PNG Converter | DailyDevTools',
    description: 'Convert SVG files to PNG images directly in your browser.',
};

export default function SvgToPngPage() {
    return <SvgToPngClient />;
}
