"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import LiquidSelect from "../../../components/ui/LiquidSelect";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

const RECORD_TYPES = ["A", "AAAA", "CNAME", "MX", "NS", "TXT", "PTR", "SRV", "SOA"];

export default function DNSLookupClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [domain, setDomain] = useState("");
    const [type, setType] = useState("A");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const lookup = async () => {
        if (!domain) return;
        setLoading(true);
        setError("");
        setData(null);

        try {
            const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`, {
                headers: { 'accept': 'application/dns-json' }
            });
            if (!res.ok) throw new Error("Failed to fetch DNS");
            const json = await res.json();
            setData(json);
        } catch (e: any) {
            setError(e.message || "Error fetching DNS data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title={tTools('dns-lookup.name')}
                        description={tTools('dns-lookup.description')}
                        icon={<Globe size={28} className="text-[#fb923c]" />}
                    />

                    <div className="relative z-20 flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Globe size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-text)] z-10" />
                            <LiquidInput
                                value={domain}
                                onChange={e => setDomain(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && lookup()}
                                placeholder={t('DnsLookup.placeholder')}
                                className="pl-12"
                            />
                        </div>
                        <LiquidSelect
                            value={type}
                            onChange={setType}
                            options={RECORD_TYPES}
                            className="min-w-[120px]"
                        />
                        <LiquidButton onClick={lookup} className="px-8">
                            {loading ? "..." : t('DnsLookup.lookup')}
                        </LiquidButton>
                    </div>

                    {error && <div className="text-[#ef4444] text-center mb-6">{error}</div>}

                    {data && (
                        <div className="grid gap-4">
                            <div className="flex gap-4 flex-wrap">
                                <LiquidCard className="flex-1 p-5 text-center sm:text-left">
                                    <div className="text-[13px] text-[var(--muted-text)] mb-1">{t('DnsLookup.status')}</div>
                                    <div className={`text-lg font-semibold ${data.Status === 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                                        {data.Status === 0 ? "NOERROR" : `Error ${data.Status}`}
                                    </div>
                                </LiquidCard>
                                <LiquidCard className="flex-1 p-5 text-center sm:text-left">
                                    <div className="text-[13px] text-[var(--muted-text)] mb-1">{t('DnsLookup.time')}</div>
                                    <div className="text-lg text-[var(--foreground)] font-semibold">
                                        {Date.now() - (data.Timestamp ? 0 : 0)} ms (est)
                                    </div>
                                </LiquidCard>
                                <LiquidCard className="flex-1 p-5 text-center sm:text-left">
                                    <div className="text-[13px] text-[var(--muted-text)] mb-1">{t('DnsLookup.server')}</div>
                                    <div className="text-lg text-[var(--foreground)] font-semibold">Cloudflare DoH</div>
                                </LiquidCard>
                            </div>

                            <LiquidCard className="p-0 overflow-hidden">
                                <div className="p-4 px-5 border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                                    {t('DnsLookup.answerSection')}
                                </div>
                                {data.Answer ? (
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-neutral-100/50 dark:bg-white/5 text-left text-[13px] text-[var(--muted-text)]">
                                                <th className="p-3 px-5">{t('DnsLookup.name')}</th>
                                                <th className="p-3 px-5">{t('DnsLookup.type')}</th>
                                                <th className="p-3 px-5">{t('DnsLookup.ttl')}</th>
                                                <th className="p-3 px-5">{t('DnsLookup.data')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.Answer.map((ans: any, i: number) => (
                                                <tr key={i} className="border-t border-[var(--border-color)]">
                                                    <td className="p-3 px-5 text-[var(--foreground)]">{ans.name}</td>
                                                    <td className="p-3 px-5 text-[#fb923c]">{RECORD_TYPES.find(t => t === type) || ans.type}</td>
                                                    <td className="p-3 px-5 text-[var(--muted-text)]">{ans.TTL}</td>
                                                    <td className="p-3 px-5 text-[var(--foreground)] font-mono break-all">{ans.data}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-8 text-center text-[var(--muted-text)]">{t('DnsLookup.noRecords')} {type}.</div>
                                )}
                            </LiquidCard>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
