"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import { useTranslations } from "next-intl";

export default function TimezoneConverterClient() {
    const t = useTranslations('TimezoneConverter');
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        const now = new Date();
        setDate(now.toISOString().split('T')[0]);
        // Format time as HH:MM
        setTime(now.toTimeString().slice(0, 5));
    }, []);

    const getTimes = () => {
        if (!date || !time) return [];
        // Create date object from local input
        // Note: New Date("YYYY-MM-DDTHH:MM") creates a date in local time
        const d = new Date(`${date}T${time}:00`);

        const zones = [
            { id: "utc", zone: "UTC" },
            { id: "newYork", zone: "America/New_York" },
            { id: "losAngeles", zone: "America/Los_Angeles" },
            { id: "london", zone: "Europe/London" },
            { id: "paris", zone: "Europe/Paris" },
            { id: "tokyo", zone: "Asia/Tokyo" },
            { id: "sydney", zone: "Australia/Sydney" },
            { id: "dubai", zone: "Asia/Dubai" },
            { id: "india", zone: "Asia/Kolkata" },
        ];

        return zones.map(z => {
            try {
                return {
                    name: t(`zones.${z.id}`),
                    time: d.toLocaleString('en-US', { timeZone: z.zone, dateStyle: 'medium', timeStyle: 'short' })
                };
            } catch (e) { return { name: t(`zones.${z.id}`), time: t('invalid') }; }
        });
    };

    const results = getTimes();

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">
                    <ToolPageHeader
                        title="Timezone Converter"
                        description="Check the time across multiple major timezones instantly."
                        icon={<Clock size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-orange-500/20 hover:-translate-y-1 p-10">

                        <div className="flex flex-wrap gap-6 mb-10">
                            <div className="flex-1 min-w-[200px]">
                                <label className="block mb-2 text-neutral-500 dark:text-neutral-400 text-[13px] font-medium uppercase tracking-wide">{t('date')}</label>
                                <LiquidInput
                                    type="date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    className="dark:[color-scheme:dark]"
                                />
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                <label className="block mb-2 text-neutral-500 dark:text-neutral-400 text-[13px] font-medium uppercase tracking-wide">{t('time')}</label>
                                <LiquidInput
                                    type="time"
                                    value={time}
                                    onChange={e => setTime(e.target.value)}
                                    className="dark:[color-scheme:dark]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            {results.map(r => (
                                <div key={r.name} className="flex justify-between items-center p-4 bg-neutral-100 dark:bg-white/5 border border-transparent hover:border-orange-500/30 rounded-xl transition-all">
                                    <span className="text-neutral-500 dark:text-neutral-400 font-medium">{r.name}</span>
                                    <span className="text-[var(--foreground)] font-semibold font-mono">{r.time}</span>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
