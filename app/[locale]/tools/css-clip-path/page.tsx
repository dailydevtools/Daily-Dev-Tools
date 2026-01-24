import { Metadata } from 'next';
import CssClipPathClient from "./Client";

export const metadata: Metadata = {
    title: 'CSS Clip-Path Generator | DailyDevTools',
    description: 'Create custom shapes with CSS clip-path. Triangle, circle, polygon, and more. Copy CSS instantly.',
};

export default function CssClipPathPage() {
    return <CssClipPathClient />;
}
