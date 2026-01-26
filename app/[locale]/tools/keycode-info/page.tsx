import { constructToolMetadata } from '@/app/lib/seo';
import KeyCodeInfoClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'keycode-info' });
}

export default function KeyCodeInfoPage() {
    return <KeyCodeInfoClient />;
}
