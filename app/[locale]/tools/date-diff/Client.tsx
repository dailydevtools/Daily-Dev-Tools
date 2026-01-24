"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

interface DateResult {
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalHours: number;
    totalWeeks: number;
}

export default function DateDiffClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [result, setResult] = useState<DateResult | null>(null);

    const calculate = () => {
        if (!start || !end) return;
        const d1 = new Date(start);
        const d2 = new Date(end);

        // Ensure d2 > d1
        const diff = Math.abs(d2.getTime() - d1.getTime());

        // Breakdown
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        // Y/M/D approx
        let tempD1 = new Date(d1 < d2 ? d1 : d2);
        let tempD2 = new Date(d1 < d2 ? d2 : d1);

        let years = tempD2.getFullYear() - tempD1.getFullYear();
        let months = tempD2.getMonth() - tempD1.getMonth();
        let dateDiff = tempD2.getDate() - tempD1.getDate();

        if (dateDiff < 0) {
            months--;
            dateDiff += new Date(tempD2.getFullYear(), tempD2.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        setResult({ years, months, days: dateDiff, totalDays: days, totalHours: hours, totalWeeks: weeks });
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title={tTools('date-diff.name')}
                        description={tTools('date-diff.description')}
                        icon={<CalendarDays size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('DateDiff.startDate')}</label>
                                <input type="date" value={start} onChange={e => setStart(e.target.value)} className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-base" />
                            </div>
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('DateDiff.endDate')}</label>
                                <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-base" />
                            </div>
                        </div>
                        <button onClick={calculate} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-8">{t('DateDiff.calculate')}</button>
                    </div>

                    {result && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 col-span-1 md:col-span-2 text-center bg-gradient-to-br from-orange-500/10 to-yellow-400/10">
                                <div className="text-[13px] text-[#fb923c] mb-1">{t('DateDiff.difference')}</div>
                                <div className="text-3xl font-bold text-white">
                                    {result.years > 0 ? `${result.years} ${t('DateDiff.years')}, ` : ''}
                                    {result.months > 0 ? `${result.months} ${t('DateDiff.months')}, ` : ''}
                                    {result.days} {t('DateDiff.days')}
                                </div>
                            </div>

                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-5 text-center">
                                <div className="text-xs text-[#9ca3af] mb-1">{t('DateDiff.totalDays')}</div>
                                <div className="text-2xl font-bold text-white">{result.totalDays.toLocaleString()}</div>
                            </div>
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-5 text-center">
                                <div className="text-xs text-[#9ca3af] mb-1">{t('DateDiff.totalWeeks')}</div>
                                <div className="text-2xl font-bold text-white">{result.totalWeeks.toLocaleString()}</div>
                            </div>
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-5 text-center">
                                <div className="text-xs text-[#9ca3af] mb-1">{t('DateDiff.totalHours')}</div>
                                <div className="text-2xl font-bold text-white">{result.totalHours.toLocaleString()}</div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
