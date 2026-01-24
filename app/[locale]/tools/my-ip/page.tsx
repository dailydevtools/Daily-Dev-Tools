import { Metadata } from 'next';
import MyIPClient from "./Client";

export const metadata: Metadata = {
    title: 'My IP Address | DailyDevTools',
    description: 'What is my IP? Check your public IP address, ISP, and location.',
};

export default function MyIPPage() {
    return <MyIPClient />;
}
