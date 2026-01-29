"use client";

import { useState } from "react";
import { BarChart, Search } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

interface KeywordStat {
    word: string;
    count: number;
    density: string;
}

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

export default function KeywordDensityClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [input, setInput] = useState("");
    const [stats, setStats] = useState<KeywordStat[]>([]);

    const analyze = () => {
        if (!input.trim()) return;

        // Normalize: lowercase, remove special chars (keep alphanumeric and spaces)
        const text = input.toLowerCase().replace(/[^\w\s]/g, '');
        const words = text.split(/\s+/).filter(w => w.length > 2); // Filter short words
        const total = words.length;

        const counts: Record<string, number> = {};
        words.forEach(w => {
            counts[w] = (counts[w] || 0) + 1;
        });

        const sorted = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 50) // Top 50
            .map(([word, count]) => ({
                word,
                count,
                density: ((count / total) * 100).toFixed(2) + '%'
            }));

        setStats(sorted);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title={tTools('keyword-density.name')}
                        description={tTools('keyword-density.description')}
                        icon={<Search size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
                        <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all h-full">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5 text-[var(--muted-text)] text-xs font-medium uppercase tracking-wider">
                                {t('common.input')}
                            </div>
                            <textarea
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder={t('KeywordDensity.inputPlaceholder')}
                                className="flex-1 w-full bg-transparent border-none p-5 text-[var(--foreground)] text-sm resize-none outline-none leading-relaxed"
                            />
                            <div className="p-4 border-t border-[var(--border-color)] flex justify-end bg-neutral-50 dark:bg-white/[0.02]">
                                <LiquidButton onClick={analyze}>
                                    {t('KeywordDensity.analyze')}
                                </LiquidButton>
                            </div>
                        </LiquidCard>

                        <LiquidCard className="p-0 overflow-hidden flex flex-col h-full">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5 flex items-center gap-2 text-[var(--foreground)] font-medium">
                                <BarChart size={18} className="text-orange-500" /> {t('common.output')}
                            </div>
                            <div className="overflow-y-auto flex-1 custom-scrollbar">
                                {stats.length > 0 ? (
                                    <table className="w-full border-collapse text-sm">
                                        <thead className="bg-neutral-50 dark:bg-white/5 text-[var(--muted-text)] text-xs uppercase tracking-wider sticky top-0 backdrop-blur-md">
                                            <tr>
                                                <th className="p-3 px-5 text-left font-medium">{t('KeywordDensity.keyword')}</th>
                                                <th className="p-3 px-5 text-right font-medium">{t('KeywordDensity.count')}</th>
                                                <th className="p-3 px-5 text-right font-medium">{t('KeywordDensity.density')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--border-color)]">
                                            {stats.map((s, i) => (
                                                <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                                    <td className="p-3 px-5 text-[var(--foreground)] font-medium">{s.word}</td>
                                                    <td className="p-3 px-5 text-right text-orange-500 font-mono">{s.count}</td>
                                                    <td className="p-3 px-5 text-right text-[var(--muted-text)] font-mono">{s.density}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-[var(--muted-text)] gap-4 p-10 opacity-60">
                                        <BarChart size={48} className="opacity-20" />
                                        <p>{t('HtmlEncoder.resultPlaceholder')}</p>
                                    </div>
                                )}
                            </div>
                        </LiquidCard>
                    </div>
                </div>
            </div>
        </main>
    );
}
