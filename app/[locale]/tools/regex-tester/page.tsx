import { constructToolMetadata } from '@/app/lib/seo';
import RegexTesterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'regex-tester' });
}

export default function RegexTesterPage() {
    return <RegexTesterClient />;
}
