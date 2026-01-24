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

                    <div className="grid grid-cols-[minmax(300px,1fr)_1fr] gap-6">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 flex flex-col">
                            <div className="p-3 bg-black/20 text-[#9ca3af] text-[13px] border-b border-white/10">
                                {t('common.input')}
                            </div>
                            <textarea
                                value={input} onChange={e => setInput(e.target.value)}
                                placeholder={t('KeywordDensity.inputPlaceholder')}
                                className="w-full h-[400px] bg-transparent border-none p-5 text-white text-sm resize-none outline-none"
                            />
                            <div className="p-4 text-right border-t border-white/10">
                                <button onClick={analyze} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-2.5 px-6">{t('KeywordDensity.analyze')}</button>
                            </div>
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 overflow-hidden flex flex-col max-h-[460px]">
                            <div className="p-4 bg-black/20 text-white font-semibold border-b border-white/10 flex items-center gap-2">
                                <BarChart size={18} color="#fb923c" /> {t('common.output')}
                            </div>
                            <div className="overflow-y-auto flex-1">
                                {stats.length > 0 ? (
                                    <table className="w-full border-collapse text-sm">
                                        <thead className="bg-white/5 text-[#9ca3af] text-left sticky top-0">
                                            <tr>
                                                <th className="p-3 px-4">{t('KeywordDensity.keyword')}</th>
                                                <th className="p-3 px-4">{t('KeywordDensity.count')}</th>
                                                <th className="p-3 px-4">{t('KeywordDensity.density')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stats.map((s, i) => (
                                                <tr key={i} className="border-b border-white/5">
                                                    <td className="p-2.5 px-4 text-white">{s.word}</td>
                                                    <td className="p-2.5 px-4 text-[#fb923c]">{s.count}</td>
                                                    <td className="p-2.5 px-4 text-[#9ca3af]">{s.density}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-10 text-center text-[#6b7280]">
                                        {t('HtmlEncoder.resultPlaceholder')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
