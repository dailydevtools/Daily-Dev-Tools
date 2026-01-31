"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import { LiquidProgressBar } from "../../../components/ui/LiquidProgressBar";
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

                    <LiquidCard className="p-10 text-center">
                        <div className="text-[13px] text-[var(--muted-text)] mb-3">{t('checkLabel')}</div>
                        <div className="mb-10">
                            <LiquidInput
                                type="date"
                                value={date} onChange={e => setDate(e.target.value)}
                                className="max-w-[240px] mx-auto text-center cursor-pointer dark:[color-scheme:dark]"
                            />
                        </div>

                        <div className="bg-[var(--card-hover-bg)] border border-[var(--border-color)] p-8 rounded-3xl mb-10 inline-block min-w-[200px]">
                            <div className="text-base text-[var(--muted-text)] mb-2 font-medium">Week Number</div>
                            <div className="text-8xl font-black text-orange-500 leading-none tracking-tighter">{week}</div>
                        </div>

                        <div className="text-left max-w-[400px] mx-auto">
                            <div className="flex justify-between mb-2 text-sm">
                                <span className="text-[var(--muted-text)] font-medium">{t('yearProgress')}</span>
                                <span className="text-[var(--foreground)] font-medium">{yearProgress.toFixed(1)}%</span>
                            </div>
                            <LiquidProgressBar
                                value={yearProgress}
                                max={100}
                                height="h-3"
                            />
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
