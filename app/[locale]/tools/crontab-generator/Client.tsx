"use client";

import { useState } from "react";
import { RefreshCw, Copy, Check, Clock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function CrontabGeneratorClient() {
    const t = useTranslations('CrontabGenerator');
    const [min, setMin] = useState("*");
    const [hour, setHour] = useState("*");
    const [day, setDay] = useState("*");
    const [month, setMonth] = useState("*");
    const [week, setWeek] = useState("*");
    const [copied, setCopied] = useState(false);

    const result = `${min} ${hour} ${day} ${month} ${week}`;

    const common = [
        { l: t('everyMinute'), v: "* * * * *" },
        { l: t('every5Minutes'), v: "*/5 * * * *" },
        { l: t('everyHour'), v: "0 * * * *" },
        { l: t('everyDayMidnight'), v: "0 0 * * *" },
        { l: t('everyWeek'), v: "0 0 * * 0" },
        { l: t('everyMonth'), v: "0 0 1 * *" },
    ];

    const setPreset = (v: string) => {
        const p = v.split(' ');
        setMin(p[0]); setHour(p[1]); setDay(p[2]); setMonth(p[3]); setWeek(p[4]);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title="Crontab Generator"
                        description="Easily generate crontab schedules for your cron jobs."
                        icon={<Clock size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">

                        <div className="p-10 bg-white/5 rounded-2xl text-center mb-10 border border-white/5 relative">
                            <button
                                onClick={copyToClipboard}
                                className="absolute right-4 top-4 p-2 rounded-lg bg-white/5 text-[#9ca3af] hover:text-white hover:bg-white/10 transition-all"
                            >
                                {copied ? <Check size={18} className="text-[#4ade80]" /> : <Copy size={18} />}
                            </button>
                            <div className="text-5xl font-bold text-[#fb923c] font-mono mb-4 tracking-[4px]">
                                {result}
                            </div>
                            <div className="flex justify-center gap-6 text-[13px] text-[#9ca3af] uppercase tracking-wider font-medium">
                                <div className="w-12">{t('min')}</div>
                                <div className="w-12">{t('hour')}</div>
                                <div className="w-12">{t('day')}</div>
                                <div className="w-12">{t('mon')}</div>
                                <div className="w-12">{t('week')}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-4 mb-10">
                            <div>
                                <label className="block mb-2 text-xs text-[#9ca3af] font-medium uppercase tracking-wide text-center">{t('minute')}</label>
                                <input type="text" value={min} onChange={e => setMin(e.target.value)} className="input-field w-full text-center p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#fb923c]" />
                            </div>
                            <div>
                                <label className="block mb-2 text-xs text-[#9ca3af] font-medium uppercase tracking-wide text-center">{t('hour')}</label>
                                <input type="text" value={hour} onChange={e => setHour(e.target.value)} className="input-field w-full text-center p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#fb923c]" />
                            </div>
                            <div>
                                <label className="block mb-2 text-xs text-[#9ca3af] font-medium uppercase tracking-wide text-center">{t('day')}</label>
                                <input type="text" value={day} onChange={e => setDay(e.target.value)} className="input-field w-full text-center p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#fb923c]" />
                            </div>
                            <div>
                                <label className="block mb-2 text-xs text-[#9ca3af] font-medium uppercase tracking-wide text-center">{t('month')}</label>
                                <input type="text" value={month} onChange={e => setMonth(e.target.value)} className="input-field w-full text-center p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#fb923c]" />
                            </div>
                            <div>
                                <label className="block mb-2 text-xs text-[#9ca3af] font-medium uppercase tracking-wide text-center">{t('weekday')}</label>
                                <input type="text" value={week} onChange={e => setWeek(e.target.value)} className="input-field w-full text-center p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#fb923c]" />
                            </div>
                        </div>

                        <div>
                            <div className="text-[13px] text-[#9ca3af] mb-4 font-medium uppercase tracking-wider">{t('presets')}</div>
                            <div className="flex flex-wrap gap-3">
                                {common.map(c => (
                                    <button
                                        key={c.l} onClick={() => setPreset(c.v)}
                                        className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] text-[13px] py-2 px-4 hover:border-[#fb923c] hover:text-[#fb923c]"
                                    >
                                        {c.l}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
