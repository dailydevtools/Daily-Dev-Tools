import { Metadata } from 'next';
import TimezoneConverterClient from "./Client";

export const metadata: Metadata = {
    title: 'Timezone Converter | DailyDevTools',
    description: 'Convert local time to multiple time zones around the world.',
};

export default function TimezoneConverterPage() {
    return <TimezoneConverterClient />;
}
