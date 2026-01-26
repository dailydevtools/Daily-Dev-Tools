import { constructToolMetadata } from '@/app/lib/seo';
import ScreenRecorderClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'screen-recorder' });
}

export default function ScreenRecorderPage() {
    return <ScreenRecorderClient />;
}
