import { Metadata } from 'next';
import TimestampConverterClient from "./Client";

export const metadata: Metadata = {
    title: 'Unix Timestamp Converter | DailyDevTools',
    description: 'Convert Unix timestamps to human readable dates and vice-versa.',
};

export default function TimestampConverterPage() {
    return <TimestampConverterClient />;
}
