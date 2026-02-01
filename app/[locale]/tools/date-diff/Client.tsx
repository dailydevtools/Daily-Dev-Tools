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

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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

                    <LiquidCard className="p-10 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('DateDiff.startDate')}</label>
                                <LiquidInput type="date" value={start} onChange={e => setStart(e.target.value)} className="text-lg cursor-pointer dark:[color-scheme:dark]" />
                            </div>
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('DateDiff.endDate')}</label>
                                <LiquidInput type="date" value={end} onChange={e => setEnd(e.target.value)} className="text-lg cursor-pointer dark:[color-scheme:dark]" />
                            </div>
                        </div>
                        <div className="text-center">
                            <LiquidButton onClick={calculate} className="w-full md:w-auto px-12 py-3">
                                {t('DateDiff.calculate')}
                            </LiquidButton>
                        </div>
                    </LiquidCard>

                    {result && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fadeIn_0.5s_ease-out]">
                            <LiquidCard className="p-8 col-span-1 md:col-span-2 text-center bg-gradient-to-br from-orange-500/5 to-yellow-500/5 border-orange-200/50 dark:border-orange-500/20">
                                <div className="text-sm text-orange-600 dark:text-orange-400 mb-2 font-medium uppercase tracking-wide">{t('DateDiff.difference')}</div>
                                <div className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                                    {result.years > 0 ? `${result.years} ${t('DateDiff.years')}, ` : ''}
                                    {result.months > 0 ? `${result.months} ${t('DateDiff.months')}, ` : ''}
                                    {result.days} {t('DateDiff.days')}
                                </div>
                            </LiquidCard>

                            <LiquidCard className="p-6 text-center">
                                <div className="text-xs text-[var(--muted-text)] uppercase tracking-wider mb-2 font-medium">{t('DateDiff.totalDays')}</div>
                                <div className="text-3xl font-bold text-[var(--foreground)]">{result.totalDays.toLocaleString()}</div>
                            </LiquidCard>
                            <LiquidCard className="p-6 text-center">
                                <div className="text-xs text-[var(--muted-text)] uppercase tracking-wider mb-2 font-medium">{t('DateDiff.totalWeeks')}</div>
                                <div className="text-3xl font-bold text-[var(--foreground)]">{result.totalWeeks.toLocaleString()}</div>
                            </LiquidCard>
                            <LiquidCard className="p-6 text-center md:col-span-2">
                                <div className="text-xs text-[var(--muted-text)] uppercase tracking-wider mb-2 font-medium">{t('DateDiff.totalHours')}</div>
                                <div className="text-3xl font-bold text-[var(--foreground)]">{result.totalHours.toLocaleString()}</div>
                            </LiquidCard>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
