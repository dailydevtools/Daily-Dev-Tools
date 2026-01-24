import { Metadata } from 'next';
import GradientGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'CSS Gradient Generator | DailyDevTools',
    description: 'Create and customize linear and radial CSS gradients visually. Copy CSS code instantly.',
};

export default function GradientGeneratorPage() {
    return <GradientGeneratorClient />;
}
