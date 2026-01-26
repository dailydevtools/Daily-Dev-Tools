"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Copy, Check, Clock, ChevronRight } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

export default function CrontabGeneratorClient() {
    const t = useTranslations('CrontabGenerator');
    const [min, setMin] = useState("*");
    const [hour, setHour] = useState("*");
    const [day, setDay] = useState("*");
    const [month, setMonth] = useState("*");
    const [week, setWeek] = useState("*");
    const [copied, setCopied] = useState(false);
    const [nextDates, setNextDates] = useState<Date[]>([]);
    const [showMore, setShowMore] = useState(false);
    const [humanText, setHumanText] = useState("");

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

    // --- Simple Cron Parser Implementation ---

    // Parse a single field string into a set of allowed values for that field range
    const parseField = (field: string, minVal: number, maxVal: number): Set<number> => {
        const allowed = new Set<number>();
        const parts = field.split(',');

        for (const part of parts) {
            if (part === '*') {
                for (let i = minVal; i <= maxVal; i++) allowed.add(i);
                continue;
            }

            if (part.includes('/')) {
                const [range, stepStr] = part.split('/');
                const step = parseInt(stepStr, 10);

                let start = minVal, end = maxVal;
                if (range !== '*') {
                    if (range.includes('-')) {
                        const [s, e] = range.split('-').map(v => parseInt(v, 10));
                        start = s; end = e;
                    } else {
                        start = parseInt(range, 10);
                    }
                }

                for (let i = start; i <= end; i += step) allowed.add(i);
                continue;
            }

            if (part.includes('-')) {
                const [start, end] = part.split('-').map(v => parseInt(v, 10));
                for (let i = start; i <= end; i++) allowed.add(i);
                continue;
            }

            const val = parseInt(part, 10);
            if (!isNaN(val)) allowed.add(val);
        }
        return allowed;
    };

    useEffect(() => {
        try {
            // Human readable generation (Simple approximation)
            let text = "";
            if (min === "*" && hour === "*" && day === "*" && month === "*" && week === "*") {
                text = "Every minute";
            } else if (min !== "*" && hour === "*" && day === "*") {
                text = `At minute ${min}`;
            } else if (min === "0" && hour !== "*" && day === "*") {
                // Check if hour is complex
                if (hour.includes(',')) text = `At minute 0 past hour ${hour}`;
                else text = `At ${hour.padStart(2, '0')}:00`;
            } else if (min !== "*" && hour !== "*" && day === "*") {
                text = `At ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
            } else {
                text = "Custom schedule"; // Fallback for complex
            }

            // Refine simple "At HH:MM"
            if (!min.includes('*') && !min.includes('/') && !min.includes(',') && !min.includes('-') &&
                !hour.includes('*') && !hour.includes('/') && !hour.includes(',') && !hour.includes('-')) {
                text = `At ${hour.padStart(2, '0')}:${min.padStart(2, '0')}.`;
            }

            setHumanText(text);

            // Calculate Next Dates
            // This is a simplified iterative search.
            const nextRuns: Date[] = [];
            let current = new Date();
            // Start checking from the next minute.
            current.setSeconds(0, 0);
            current.setMinutes(current.getMinutes() + 1);

            // Safety limit to prevent infinite loops
            let attempts = 0;
            const maxAttempts = 10000;

            // Parse Allowed Values
            // Note: Month is 0-11 in JS Date, but 1-12 in Cron
            // Weekday is 0-6 (Sun-Sat) in JS, 0-6 in Cron (usually)
            const allowedMin = parseField(min, 0, 59);
            const allowedHour = parseField(hour, 0, 23);
            const allowedDay = parseField(day, 1, 31);
            const allowedMonth = parseField(month, 1, 12);
            const allowedWeek = parseField(week, 0, 6);

            while (nextRuns.length < 5 && attempts < maxAttempts) {
                const m = current.getMinutes();
                const h = current.getHours();
                const d = current.getDate();
                const mo = current.getMonth() + 1; // 1-12
                const wd = current.getDay(); // 0-6

                const minMatch = allowedMin.has(m);
                const hourMatch = allowedHour.has(h);
                const monthMatch = allowedMonth.has(mo);

                // Day/Week Handling: 
                // In cron, if both DOM and DOW are restricted (not *), matches if EITHER is true.
                // If one is *, matches if the other is true.
                // If both *, matches always.
                // Here we simplify by checking basic matches.
                let dayMatch = false;
                const domRestricted = day !== '*';
                const dowRestricted = week !== '*';

                if (domRestricted && dowRestricted) {
                    dayMatch = allowedDay.has(d) || allowedWeek.has(wd);
                } else if (domRestricted) {
                    dayMatch = allowedDay.has(d);
                } else if (dowRestricted) {
                    dayMatch = allowedWeek.has(wd);
                } else {
                    dayMatch = true;
                }

                if (minMatch && hourMatch && monthMatch && dayMatch) {
                    nextRuns.push(new Date(current));
                }

                // Advance by 1 minute
                current.setMinutes(current.getMinutes() + 1);
                attempts++;
            }
            setNextDates(nextRuns);

        } catch (e) {
            setHumanText("Invalid expression");
            setNextDates([]);
        }
    }, [min, hour, day, month, week]);

    const formatDate = (date: Date) => {
        return date.getFullYear() + "-" +
            String(date.getMonth() + 1).padStart(2, '0') + "-" +
            String(date.getDate()).padStart(2, '0') + " " +
            String(date.getHours()).padStart(2, '0') + ":" +
            String(date.getMinutes()).padStart(2, '0') + ":" +
            String(date.getSeconds()).padStart(2, '0');
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title="Crontab Generator"
                        description="Easily generate crontab schedules for your cron jobs."
                        icon={<ToolIcon name="Clock" size={32} />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-4 sm:p-6 md:p-10">

                        <div className="p-4 sm:p-6 md:p-10 bg-white/5 rounded-2xl text-center mb-6 sm:mb-10 border border-white/5 relative">
                            <button
                                onClick={copyToClipboard}
                                className="absolute right-4 top-4 p-2 rounded-lg bg-white/5 text-[#9ca3af] hover:text-white hover:bg-white/10 transition-all"
                            >
                                {copied ? <Check size={18} className="text-[#4ade80]" /> : <Copy size={18} />}
                            </button>
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#fb923c] font-mono mb-4 tracking-[2px] sm:tracking-[4px]">
                                {result}
                            </div>
                            <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 text-[10px] sm:text-[11px] md:text-[13px] text-[#9ca3af] uppercase tracking-wider font-medium">
                                <div className="w-10 sm:w-12">{t('minute')}</div>
                                <div className="w-10 sm:w-12">{t('hour')}</div>
                                <div className="w-10 sm:w-12">{t('day')}</div>
                                <div className="w-10 sm:w-12">{t('month')}</div>
                                <div className="w-10 sm:w-12">{t('weekday')}</div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <div className="text-lg text-white font-medium mb-2 opacity-90">
                                    “{humanText}”
                                </div>
                                {nextDates.length > 0 && (
                                    <div className="text-sm text-[#9ca3af]">
                                        <div className="flex items-center justify-center gap-2">
                                            <span>
                                                Next at <span className="text-[#fb923c]">{formatDate(nextDates[0])}</span>
                                            </span>
                                            {!showMore && nextDates.length > 1 && (
                                                <button
                                                    onClick={() => setShowMore(true)}
                                                    className="inline-flex items-center gap-1 text-[11px] bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors ml-2 cursor-pointer"
                                                >
                                                    next <ChevronRight size={10} />
                                                </button>
                                            )}
                                        </div>

                                        {showMore && (
                                            <div className="mt-3 flex flex-col gap-1 animate-fadeIn">
                                                {nextDates.slice(1).map((date, i) => (
                                                    <div key={i} className="text-xs opacity-75">
                                                        then at <span className="text-[#fb923c]">{formatDate(date)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-10">
                            <div>
                                <label className="block mb-2 text-xs text-[#9ca3af] font-medium uppercase tracking-wide text-center">{t('minute')}</label>
                                <input type="text" value={min} onChange={e => { setMin(e.target.value); setShowMore(false); }} className="input-field w-full text-center p-2 sm:p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#fb923c]" />
                            </div>
                            <div>
                                <label className="block mb-2 text-xs text-[#9ca3af] font-medium uppercase tracking-wide text-center">{t('hour')}</label>
                                <input type="text" value={hour} onChange={e => { setHour(e.target.value); setShowMore(false); }} className="input-field w-full text-center p-2 sm:p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#fb923c]" />
                            </div>
                            <div>
                                <label className="block mb-2 text-xs text-[#9ca3af] font-medium uppercase tracking-wide text-center">{t('day')}</label>
                                <input type="text" value={day} onChange={e => { setDay(e.target.value); setShowMore(false); }} className="input-field w-full text-center p-2 sm:p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#fb923c]" />
                            </div>
                            <div>
                                <label className="block mb-2 text-xs text-[#9ca3af] font-medium uppercase tracking-wide text-center">{t('month')}</label>
                                <input type="text" value={month} onChange={e => { setMonth(e.target.value); setShowMore(false); }} className="input-field w-full text-center p-2 sm:p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#fb923c]" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block mb-2 text-xs text-[#9ca3af] font-medium uppercase tracking-wide text-center">{t('weekday')}</label>
                                <input type="text" value={week} onChange={e => { setWeek(e.target.value); setShowMore(false); }} className="input-field w-full text-center p-2 sm:p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#fb923c]" />
                            </div>
                        </div>

                        <div>
                            <div className="text-[13px] text-[#9ca3af] mb-4 font-medium uppercase tracking-wider">{t('presets')}</div>
                            <div className="flex flex-wrap gap-3">
                                {common.map(c => (
                                    <button
                                        key={c.l} onClick={() => { setPreset(c.v); setShowMore(false); }}
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
