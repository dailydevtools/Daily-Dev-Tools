import { Metadata } from 'next';
import UtmBuilderClient from "./Client";

export const metadata: Metadata = {
    title: 'UTM Builder | DailyDevTools',
    description: 'Create UTM tracked URLs for your marketing campaigns easily.',
};

export default function UtmBuilderPage() {
    return <UtmBuilderClient />;
}
