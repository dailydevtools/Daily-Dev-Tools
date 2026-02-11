import { constructToolMetadata } from '@/app/lib/seo';
import VisualDatabaseDesignerClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'visual-database-designer' });
}

export default function VisualDatabaseDesignerPage() {
    return <VisualDatabaseDesignerClient />;
}
