"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function WeekNumberClient() {
    const t = useTranslations('WeekNumber');
    const [date, setDate] = useState("");
    const [week, setWeek] = useState(0);
    const [yearProgress, setYearProgress] = useState(0);

    useEffect(() => {
        // Default to today
        const t = new Date();
        setDate(t.toISOString().split('T')[0]);
    }, []);

    useEffect(() => {
        if (!date) return;
        const d = new Date(date);
        const w = getWeek(d);
        setWeek(w);

        const start = new Date(d.getFullYear(), 0, 1);
        const end = new Date(d.getFullYear() + 1, 0, 1);
        const prog = ((d.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100;
        setYearProgress(prog);
    }, [date]);

    const getWeek = (d: Date) => {
        // ISO 8601 week number
        const target = new Date(d.valueOf());
        const dayNr = (d.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        const firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">
                    <ToolPageHeader
                        title="Week Number Calculator"
                        description="Find the current ISO week number or calculate it for any date."
                        icon={<Calendar size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center">
                        <div className="text-[13px] text-[#9ca3af] mb-3">{t('checkLabel')}</div>
                        <input
                            type="date"
                            value={date} onChange={e => setDate(e.target.value)}
                            className="input-field p-3 rounded-xl bg-black/30 border border-white/10 text-white text-base mb-8 w-full max-w-[200px]"
                        />

                        <div className="bg-white/5 p-8 rounded-3xl mb-8">
                            <div className="text-base text-[#9ca3af] mb-1">{t('weekNumber')}</div>
                            <div className="text-8xl font-black text-[#fb923c] leading-none">{week}</div>
                        </div>

                        <div className="text-left">
                            <div className="flex justify-between mb-2 text-[13px] text-[#9ca3af]">
                                <span>{t('yearProgress')}</span>
                                <span>{yearProgress.toFixed(1)}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-[#22c55e]" style={{ width: `${yearProgress}%` }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
