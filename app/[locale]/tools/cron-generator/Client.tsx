"use client";

import { useState } from "react";
import { Copy, Check, Clock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function CronGeneratorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [min, setMin] = useState("*");
    const [hour, setHour] = useState("*");
    const [dom, setDom] = useState("*");
    const [month, setMonth] = useState("*");
    const [dow, setDow] = useState("*");
    const [copied, setCopied] = useState(false);

    const cronString = `${min} ${hour} ${dom} ${month} ${dow}`;

    const presets = [
        { name: t('CronGenerator.everyMinute'), value: "* * * * *" },
        { name: t('CronGenerator.everyHour'), value: "0 * * * *" },
        { name: t('CronGenerator.everyDayMidnight'), value: "0 0 * * *" },
        { name: t('CronGenerator.everySunday'), value: "0 0 * * 0" },
        { name: t('CronGenerator.everyMonth'), value: "0 0 1 * *" },
        { name: t('CronGenerator.everyYear'), value: "0 0 1 1 *" },
    ];

    const loadPreset = (val: string) => {
        const parts = val.split(' ');
        if (parts.length === 5) {
            setMin(parts[0]);
            setHour(parts[1]);
            setDom(parts[2]);
            setMonth(parts[3]);
            setDow(parts[4]);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cronString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">

                    <ToolPageHeader
                        title={tTools('cron-generator.name')}
                        description={tTools('cron-generator.description')}
                        icon={<Clock size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6">

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 rounded-3xl flex flex-col gap-8">
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex-1 min-w-[120px]">
                                    <label className="block text-[#fb923c] text-[13px] font-semibold mb-2">{t('CronGenerator.minute')}</label>
                                    <input type="text" value={min} onChange={(e) => setMin(e.target.value)} className="w-full p-3 rounded-xl border border-white/10 bg-black/30 text-white text-lg text-center" />
                                </div>
                                <div className="flex-1 min-w-[120px]">
                                    <label className="block text-[#fb923c] text-[13px] font-semibold mb-2">{t('CronGenerator.hour')}</label>
                                    <input type="text" value={hour} onChange={(e) => setHour(e.target.value)} className="w-full p-3 rounded-xl border border-white/10 bg-black/30 text-white text-lg text-center" />
                                </div>
                                <div className="flex-1 min-w-[120px]">
                                    <label className="block text-[#fb923c] text-[13px] font-semibold mb-2">{t('CronGenerator.dayMonth')}</label>
                                    <input type="text" value={dom} onChange={(e) => setDom(e.target.value)} className="w-full p-3 rounded-xl border border-white/10 bg-black/30 text-white text-lg text-center" />
                                </div>
                                <div className="flex-1 min-w-[120px]">
                                    <label className="block text-[#fb923c] text-[13px] font-semibold mb-2">{t('CronGenerator.month')}</label>
                                    <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} className="w-full p-3 rounded-xl border border-white/10 bg-black/30 text-white text-lg text-center" />
                                </div>
                                <div className="flex-1 min-w-[120px]">
                                    <label className="block text-[#fb923c] text-[13px] font-semibold mb-2">{t('CronGenerator.dayWeek')}</label>
                                    <input type="text" value={dow} onChange={(e) => setDow(e.target.value)} className="w-full p-3 rounded-xl border border-white/10 bg-black/30 text-white text-lg text-center" />
                                </div>
                            </div>

                            <div className="bg-white/5 p-6 rounded-2xl flex items-center justify-between">
                                <div className="text-3xl font-mono text-[#4ade80] font-bold">
                                    {cronString}
                                </div>
                                <button onClick={copyToClipboard} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] flex items-center gap-2 py-2.5 px-6">
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                    {t('common.copy')}
                                </button>
                            </div>

                            <div className="text-[#9ca3af] text-sm leading-relaxed">
                                <p>{t('CronGenerator.formatInfo')}</p>
                                <p>{t('CronGenerator.usageInfo')}</p>
                            </div>
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-3xl">
                            <h3 className="text-white font-semibold mb-4">{t('CronGenerator.presets')}</h3>
                            <div className="flex flex-col gap-2">
                                {presets.map((preset) => (
                                    <button
                                        key={preset.name}
                                        onClick={() => loadPreset(preset.value)}
                                        className="hover:bg-white/5 text-left p-3 rounded-xl bg-transparent border border-white/5 text-gray-300 cursor-pointer transition-all duration-200 flex justify-between"
                                    >
                                        <span>{preset.name}</span>
                                        <span className="text-[#fb923c] font-mono text-xs">{preset.value}</span>
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
