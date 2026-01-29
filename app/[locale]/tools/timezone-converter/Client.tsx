"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">

                        <div className="flex gap-6 mb-10">
                            <div className="flex-1">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('date')}</label>
                                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field w-full p-3 rounded-xl bg-transparent dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)]" />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('time')}</label>
                                <input type="time" value={time} onChange={e => setTime(e.target.value)} className="input-field w-full p-3 rounded-xl bg-transparent dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)]" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            {results.map(r => (
                                <div key={r.name} className="flex justify-between p-4 bg-white/5 rounded-xl">
                                    <span className="text-[#9ca3af]">{r.name}</span>
                                    <span className="text-white font-semibold">{r.time}</span>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
