import { Metadata } from 'next';
import ScreenRecorderClient from "./Client";

export const metadata: Metadata = {
    title: 'Online Screen Recorder | DailyDevTools',
    description: 'Record your screen, windows, or chome tabs online for free. No watermark.',
};

export default function ScreenRecorderPage() {
    return <ScreenRecorderClient />;
}
