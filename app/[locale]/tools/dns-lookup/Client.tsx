"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 flex gap-4 items-center mb-6 flex-wrap">
                        <Globe size={20} className="text-[#9ca3af]" />
                        <input
                            value={domain}
                            onChange={e => setDomain(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && lookup()}
                            placeholder={t('DnsLookup.placeholder')}
                            className="flex-1 p-3 rounded-lg bg-black/30 border border-white/10 text-white text-base min-w-[200px]"
                        />
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className="p-3 rounded-lg bg-[#111] text-white border border-[#333]"
                        >
                            {RECORD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <button onClick={lookup} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-6">
                            {loading ? "..." : t('DnsLookup.lookup')}
                        </button>
                    </div>

                    {error && <div className="text-[#ef4444] text-center mb-6">{error}</div>}

                    {data && (
                        <div className="grid gap-4">
                            <div className="flex gap-4 flex-wrap">
                                <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 flex-1 p-5">
                                    <div className="text-[13px] text-[#9ca3af] mb-1">{t('DnsLookup.status')}</div>
                                    <div className={`text-lg font-semibold ${data.Status === 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                                        {data.Status === 0 ? "NOERROR" : `Error ${data.Status}`}
                                    </div>
                                </div>
                                <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 flex-1 p-5">
                                    <div className="text-[13px] text-[#9ca3af] mb-1">{t('DnsLookup.time')}</div>
                                    <div className="text-lg text-white font-semibold">
                                        {Date.now() - (data.Timestamp ? 0 : 0)} ms (est)
                                    </div>
                                </div>
                                <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 flex-1 p-5">
                                    <div className="text-[13px] text-[#9ca3af] mb-1">{t('DnsLookup.server')}</div>
                                    <div className="text-lg text-white font-semibold">Cloudflare DoH</div>
                                </div>
                            </div>

                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 overflow-hidden">
                                <div className="p-4 px-5 border-b border-white/10 font-semibold text-white">
                                    {t('DnsLookup.answerSection')}
                                </div>
                                {data.Answer ? (
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-white/5 text-left text-[13px] text-[#9ca3af]">
                                                <th className="p-3 px-5">{t('DnsLookup.name')}</th>
                                                <th className="p-3 px-5">{t('DnsLookup.type')}</th>
                                                <th className="p-3 px-5">{t('DnsLookup.ttl')}</th>
                                                <th className="p-3 px-5">{t('DnsLookup.data')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.Answer.map((ans: any, i: number) => (
                                                <tr key={i} className="border-t border-white/5">
                                                    <td className="p-3 px-5 text-white">{ans.name}</td>
                                                    <td className="p-3 px-5 text-[#fb923c]">{RECORD_TYPES.find(t => t === type) || ans.type}</td>
                                                    <td className="p-3 px-5 text-[#9ca3af]">{ans.TTL}</td>
                                                    <td className="p-3 px-5 text-white font-mono break-all">{ans.data}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-8 text-center text-[#6b7280]">{t('DnsLookup.noRecords')} {type}.</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
