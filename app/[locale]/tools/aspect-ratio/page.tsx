import { Metadata } from 'next';
import AspectRatioClient from "./Client";

export const metadata: Metadata = {
    title: 'Aspect Ratio Calculator | DailyDevTools',
    description: 'Calculate aspect ratios and find dimensions based on ratios. Useful for designers and developers.',
};

export default function AspectRatioPage() {
    return <AspectRatioClient />;
}
