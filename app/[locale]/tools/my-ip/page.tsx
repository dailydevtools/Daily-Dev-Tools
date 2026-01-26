import { constructToolMetadata } from '@/app/lib/seo';
import MyIPClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'my-ip' });
}

export default function MyIPPage() {
    return <MyIPClient />;
}
