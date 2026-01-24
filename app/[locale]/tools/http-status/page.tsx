import { Metadata } from 'next';
import HttpStatusClient from "./Client";

export const metadata: Metadata = {
    title: 'HTTP Status Codes | DailyDevTools',
    description: 'List of HTTP status codes (200, 404, 500, etc.) with descriptions and meanings.',
};

export default function HttpStatusPage() {
    return <HttpStatusClient />;
}
