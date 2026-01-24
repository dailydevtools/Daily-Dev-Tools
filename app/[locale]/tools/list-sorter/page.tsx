import { Metadata } from 'next';
import ListSorterClient from "./Client";

export const metadata: Metadata = {
    title: 'List Sorter | DailyDevTools',
    description: 'Sort lists alphabetically, by length, or randomize order. Remove duplicates and trim lines.',
};

export default function ListSorterPage() {
    return <ListSorterClient />;
}
