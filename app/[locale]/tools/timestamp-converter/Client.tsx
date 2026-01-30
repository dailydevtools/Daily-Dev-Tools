"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Calendar, Clock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
export default function TimestampConverterClient() {
    const t = useTranslations('TimestampConverter');
    const [timestamp, setTimestamp] = useState<number>(0);
    const [dateString, setDateString] = useState("");
    const [copied, setCopied] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    // Initial load
    useEffect(() => {
        setMounted(true);
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
                        icon={<ToolIcon name="Clock" size={32} />}
                    />

                    {/* Current Time Banner */}
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="text-[14px] text-orange-500 font-bold uppercase tracking-widest mb-4 bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                            {t('currentUnixTime')}
                        </div>
                        <div className="relative group cursor-pointer" onClick={setNow} title="Click to sync">
                            <h1 className="text-[64px] md:text-[80px] font-black font-mono text-[var(--foreground)] tracking-tighter leading-none select-none transition-all duration-300 group-hover:scale-105 group-active:scale-95">
                                {Math.floor(Date.now() / 1000)}
                            </h1>
                            <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 text-orange-500">
                                <RefreshCw size={24} />
                            </div>
                        </div>
                        <p className="text-[var(--muted-text)] mt-4 font-mono opacity-60">Click to sync with current time</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 mb-8">
                        {/* Timestamp Input */}
                        <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all h-[180px]">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5 opacity-60">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('timestampLabel')}</span>
                                </div>
                                <Clock size={14} className="text-[var(--muted-text)]" />
                            </div>
                            <div className="flex-1 flex items-center justify-center p-6 bg-[var(--card-bg)]">
                                <input
                                    type="number"
                                    value={timestamp}
                                    onChange={(e) => updateFromTimestamp(Number(e.target.value))}
                                    className="w-full bg-transparent border-none text-center text-3xl font-bold font-mono text-[var(--foreground)] outline-none placeholder:text-[var(--muted-text)]/20"
                                    placeholder="0"
                                />
                            </div>
                        </LiquidCard>

                        {/* ISO Date Input */}
                        <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all h-[180px]">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5 opacity-60">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('isoLabel')}</span>
                                </div>
                                <Calendar size={14} className="text-[var(--muted-text)]" />
                            </div>
                            <div className="flex-1 flex items-center justify-center p-6 bg-[var(--card-bg)]">
                                <input
                                    type="text"
                                    value={dateString}
                                    onChange={(e) => updateFromDate(e.target.value)}
                                    className="w-full bg-transparent border-none text-center text-lg md:text-xl font-medium font-mono text-[var(--foreground)] outline-none placeholder:text-[var(--muted-text)]/20"
                                    placeholder="YYYY-MM-DDTHH:mm:ss.sssZ"
                                />
                            </div>
                        </LiquidCard>
                    </div>

                    <div className="grid gap-3">
                        {[
                            { label: t('utcDate'), value: mounted ? parts.utc : "...", id: "utc" },
                            { label: t('localDate'), value: mounted ? parts.local : "...", id: "local" },
                            { label: t('relative'), value: mounted ? parts.relative : "...", id: "rel" }
                        ].map((item) => (
                            <LiquidCard key={item.id} className="p-0 overflow-hidden hover:-translate-y-1 transition-all duration-300 group">
                                <div className="flex items-center justify-between p-4 px-6 bg-[var(--card-bg)]">
                                    <span className="text-[var(--muted-text)] text-sm font-medium min-w-[120px]">{item.label}</span>
                                    <div className="flex items-center gap-4 flex-1 justify-end min-w-0">
                                        <code className="text-sm text-[var(--foreground)] font-mono truncate bg-neutral-100 dark:bg-black/20 px-2 py-1 rounded border border-[var(--border-color)]">
                                            {item.value}
                                        </code>
                                        <button
                                            onClick={() => copyToClipboard(item.value, item.id)}
                                            className={`
                                                w-8 h-8 flex items-center justify-center rounded-lg transition-colors border border-transparent
                                                ${copied === item.id
                                                    ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                    : 'hover:bg-neutral-100 dark:hover:bg-white/10 text-[var(--muted-text)] hover:text-[var(--foreground)]'}
                                            `}
                                        >
                                            {copied === item.id ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </LiquidCard>
                        ))}
                    </div>

                </div>
            </div>
        </main>
    );
}
