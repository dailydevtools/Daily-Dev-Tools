import { Metadata } from 'next';
import VibrationTesterClient from "./Client";

export const metadata: Metadata = {
    title: 'Vibration Tester | DailyDevTools',
    description: 'Test phone vibration motor online. Check haptic feedback.',
};

export default function VibrationTesterPage() {
    return <VibrationTesterClient />;
}
