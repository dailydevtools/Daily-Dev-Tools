import { Metadata } from 'next';
import HtpasswdGeneratorClient from "./Client";

export const metadata: Metadata = {
    title: 'Htpasswd Generator | DailyDevTools',
    description: 'Create entries for .htpasswd files to password protect websites using Basic Auth.',
};

export default function HtpasswdGeneratorPage() {
    return <HtpasswdGeneratorClient />;
}
