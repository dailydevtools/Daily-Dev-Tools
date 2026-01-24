import { Metadata } from 'next';
import DNSLookupClient from "./Client";

export const metadata: Metadata = {
    title: 'DNS Lookup | DailyDevTools',
    description: 'Check DNS records (A, MX, NS, CNAME, TXT, etc.) for any domain name using Cloudflare DoH.',
};

export default function DNSLookupPage() {
    return <DNSLookupClient />;
}
