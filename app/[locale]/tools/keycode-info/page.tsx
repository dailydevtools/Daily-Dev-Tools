import { Metadata } from 'next';
import KeyCodeInfoClient from "./Client";

export const metadata: Metadata = {
    title: 'Key Code Info | DailyDevTools',
    description: 'Find Javascript KeyCode, event.code, and event.key for any key press.',
};

export default function KeyCodeInfoPage() {
    return <KeyCodeInfoClient />;
}
