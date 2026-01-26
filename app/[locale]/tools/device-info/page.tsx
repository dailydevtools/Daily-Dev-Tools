import { constructToolMetadata } from '@/app/lib/seo';
import DeviceInfoClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'device-info' });
}

export default function DeviceInfoPage() {
    return <DeviceInfoClient />;
}
