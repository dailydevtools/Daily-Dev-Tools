import { Metadata } from 'next';
import DeviceInfoClient from "./Client";

export const metadata: Metadata = {
    title: 'Device Information | DailyDevTools',
    description: 'View detailed information about your device, browser, screen resolution, and more.',
};

export default function DeviceInfoPage() {
    return <DeviceInfoClient />;
}
