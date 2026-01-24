"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function RoiCalculatorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [invested, setInvested] = useState("");
    const [returned, setReturned] = useState("");
    const [years, setYears] = useState("1");

    const inv = Number(invested);
    const ret = Number(returned);
    const dur = Number(years);

    const gain = ret - inv;
    const roi = inv ? (gain / inv) * 100 : 0;

    // Annualized: ((End / Start) ^ (1 / Years)) - 1
    const annualized = (inv && ret && dur) ? ((Math.pow(ret / inv, 1 / dur) - 1) * 100) : 0;

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title={tTools('roi-calculator.name')}
                        description={tTools('roi-calculator.description')}
                        icon={<TrendingUp size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="flex flex-col md:flex-row gap-6 mb-10">
                            <div className="flex-1">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('RoiCalculator.investment')} ($)</label>
                                <input
                                    type="number" value={invested} onChange={e => setInvested(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-lg" placeholder="1000.00"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('RoiCalculator.finalValue')} ($)</label>
                                <input
                                    type="number" value={returned} onChange={e => setReturned(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-lg" placeholder="1500.00"
                                />
                            </div>
                            <div className="w-full md:w-[140px]">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('RoiCalculator.time')}</label>
                                <input
                                    type="number" value={years} onChange={e => setYears(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-lg" placeholder="1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <div className="text-[13px] text-[#9ca3af] mb-2">{t('RoiCalculator.totalGain')}</div>
                                <div className={`text-2xl font-bold ${gain >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>${gain.toFixed(2)}</div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <div className="text-[13px] text-[#9ca3af] mb-2">{t('RoiCalculator.roi')}</div>
                                <div className="text-2xl font-bold text-[#fb923c]">{roi.toFixed(2)}%</div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <div className="text-[13px] text-[#9ca3af] mb-2">{t('RoiCalculator.annualizedRoi')}</div>
                                <div className="text-2xl font-bold text-[#3b82f6]">{annualized.toFixed(2)}%</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
