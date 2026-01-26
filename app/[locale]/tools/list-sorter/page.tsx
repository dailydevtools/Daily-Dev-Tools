import { constructToolMetadata } from '@/app/lib/seo';
import ListSorterClient from "./Client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    return constructToolMetadata({ params, toolId: 'list-sorter' });
}

export default function ListSorterPage() {
    return <ListSorterClient />;
}
