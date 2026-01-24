import { Metadata } from 'next';
import BoxShadowGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Box Shadow Generator | DailyDevTools',
    description: 'Generate CSS box-shadows visually. Adjust position, blur, spread, color, and opacity.',
};

export default function BoxShadowGeneratorPage() {
    return <BoxShadowGeneratorClient />;
}
