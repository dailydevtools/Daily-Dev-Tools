"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Calendar, Clock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function TimestampConverterClient() {
    const t = useTranslations('TimestampConverter');
    const [timestamp, setTimestamp] = useState<number>(0);
    const [dateString, setDateString] = useState("");
    const [copied, setCopied] = useState<string | null>(null);

    // Initial load
    useEffect(() => {
        setTimestamp(Math.floor(Date.now() / 1000));
        setDateString(new Date().toISOString());
    }, []);

    const updateFromTimestamp = (ts: number) => {
        setTimestamp(ts);
        // Handle milliseconds vs seconds logic could be improved, assuming seconds for input
        const date = new Date(ts > 10000000000 ? ts : ts * 1000);
        setDateString(date.toISOString());
    };

    const updateFromDate = (iso: string) => {
        setDateString(iso);
        const date = new Date(iso);
        if (!isNaN(date.getTime())) {
            setTimestamp(Math.floor(date.getTime() / 1000));
        }
    };

    const setNow = () => {
        const now = Math.floor(Date.now() / 1000);
        updateFromTimestamp(now);
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const formatParts = (ts: number) => {
        const date = new Date(ts * 1000); // Input is seconds
        return {
            utc: date.toUTCString(),
            local: date.toLocaleString(),
            iso: date.toISOString(),
            relative: getRelativeTime(ts)
        };
    };

    const getRelativeTime = (ts: number) => {
        const now = Math.floor(Date.now() / 1000);
        const diff = now - ts;

        if (Math.abs(diff) < 60) return `${Math.abs(diff)} seconds ${diff > 0 ? 'ago' : 'from now'}`;
        if (Math.abs(diff) < 3600) return `${Math.floor(Math.abs(diff) / 60)} minutes ${diff > 0 ? 'ago' : 'from now'}`;
        if (Math.abs(diff) < 86400) return `${Math.floor(Math.abs(diff) / 3600)} hours ${diff > 0 ? 'ago' : 'from now'}`;
        return `${Math.floor(Math.abs(diff) / 86400)} days ${diff > 0 ? 'ago' : 'from now'}`;
    }

    const parts = formatParts(timestamp);

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[900px] mx-auto">
                    <ToolPageHeader
                        title="Unix Timestamp Converter"
                        description="Convert between Unix timestamps and human-readable dates."
                        icon={<span className="text-2xl font-bold">⏰</span>}
                    />

                    {/* Current Time Banner */}
                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-2xl mb-8 flex items-center justify-between bg-orange-500/10 border-orange-500/20">
                        <div>
                            <div className="text-[13px] text-[#fb923c] font-semibold uppercase mb-1">{t('currentUnixTime')}</div>
                            <div className="text-[32px] font-bold text-white font-mono">{Math.floor(Date.now() / 1000)}</div>
                        </div>
                        <button
                            onClick={setNow}
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] rounded-full w-12 h-12 p-0 flex items-center justify-center"
                            title="Reset to Now"
                        >
                            <RefreshCw size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-2xl">
                            <div className="flex items-center gap-2 mb-4 text-[#fb923c]">
                                <Clock size={18} />
                                <span className="font-semibold">{t('timestampLabel')}</span>
                            </div>
                            <input
                                type="number"
                                value={timestamp}
                                onChange={(e) => updateFromTimestamp(Number(e.target.value))}
                                className="w-full bg-black/30 border border-white/10 p-4 rounded-lg text-white text-xl font-mono outline-none"
                            />
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-2xl">
                            <div className="flex items-center gap-2 mb-4 text-[#fb923c]">
                                <Calendar size={18} />
                                <span className="font-semibold">{t('isoLabel')}</span>
                            </div>
                            <input
                                type="text"
                                value={dateString}
                                onChange={(e) => updateFromDate(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 p-4 rounded-lg text-white text-base font-mono outline-none"
                            />
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3">
                        {[
                            { label: t('utcDate'), value: parts.utc, id: "utc" },
                            { label: t('localDate'), value: parts.local, id: "local" },
                            { label: t('relative'), value: parts.relative, id: "rel" }
                        ].map((item) => (
                            <div key={item.id} className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-4 px-5 rounded-xl flex items-center justify-between">
                                <span className="text-[#9ca3af] min-w-[100px]">{item.label}</span>
                                <div className="flex items-center gap-3">
                                    <code className="text-sm text-[#e5e7eb]">{item.value}</code>
                                    <button onClick={() => copyToClipboard(item.value, item.id)} className={`bg-transparent border-none cursor-pointer ${copied === item.id ? 'text-[#4ade80]' : 'text-[#6b7280]'}`}>
                                        {copied === item.id ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </main>
    );
}
