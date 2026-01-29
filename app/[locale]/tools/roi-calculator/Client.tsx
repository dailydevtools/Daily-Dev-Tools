"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";

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

                    <LiquidCard className="p-8 md:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_140px] gap-6 mb-10">
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('RoiCalculator.investment')} ($)</label>
                                <LiquidInput
                                    type="number" value={invested} onChange={e => setInvested(e.target.value)}
                                    className="text-lg h-12" placeholder="1000.00"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('RoiCalculator.finalValue')} ($)</label>
                                <LiquidInput
                                    type="number" value={returned} onChange={e => setReturned(e.target.value)}
                                    className="text-lg h-12" placeholder="1500.00"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('RoiCalculator.time')}</label>
                                <LiquidInput
                                    type="number" value={years} onChange={e => setYears(e.target.value)}
                                    className="text-lg h-12" placeholder="1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-neutral-100/50 dark:bg-white/5 rounded-2xl border border-[var(--border-color)]">
                                <div className="text-[13px] text-[var(--muted-text)] mb-2">{t('RoiCalculator.totalGain')}</div>
                                <div className={`text-2xl font-bold ${gain >= 0 ? 'text-green-500' : 'text-red-500'}`}>${gain.toFixed(2)}</div>
                            </div>
                            <div className="p-6 bg-neutral-100/50 dark:bg-white/5 rounded-2xl border border-[var(--border-color)]">
                                <div className="text-[13px] text-[var(--muted-text)] mb-2">{t('RoiCalculator.roi')}</div>
                                <div className="text-2xl font-bold text-orange-500">{roi.toFixed(2)}%</div>
                            </div>
                            <div className="p-6 bg-neutral-100/50 dark:bg-white/5 rounded-2xl border border-[var(--border-color)]">
                                <div className="text-[13px] text-[var(--muted-text)] mb-2">{t('RoiCalculator.annualizedRoi')}</div>
                                <div className="text-2xl font-bold text-blue-500">{annualized.toFixed(2)}%</div>
                            </div>
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
