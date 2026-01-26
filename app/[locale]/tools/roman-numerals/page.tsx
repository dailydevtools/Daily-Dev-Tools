import { constructToolMetadata } from '@/app/lib/seo';
import RomanNumeralsClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'roman-numerals' });
}

export default function RomanNumeralsPage() {
    return <RomanNumeralsClient />;
}
