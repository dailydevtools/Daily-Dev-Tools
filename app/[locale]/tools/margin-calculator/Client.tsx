"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function MarginCalculatorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [cost, setCost] = useState("");
    const [revenue, setRevenue] = useState("");

    const c = Number(cost);
    const r = Number(revenue);
    const profit = r - c;
    const margin = r ? (profit / r) * 100 : 0;
    const markup = c ? (profit / c) * 100 : 0;

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title={tTools('margin-calculator.name')}
                        description={tTools('margin-calculator.description')}
                        icon={<DollarSign size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('MarginCalculator.cost')} ($)</label>
                                <input
                                    type="number" value={cost} onChange={e => setCost(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-lg" placeholder="50.00"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('MarginCalculator.revenue')} ($)</label>
                                <input
                                    type="number" value={revenue} onChange={e => setRevenue(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-lg" placeholder="100.00"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center md:text-left">
                                <div className="text-[13px] text-[#9ca3af] mb-2">{t('MarginCalculator.netProfit')}</div>
                                <div className={`text-2xl font-bold ${profit >= 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>${profit.toFixed(2)}</div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center md:text-left">
                                <div className="text-[13px] text-[#9ca3af] mb-2">{t('MarginCalculator.grossMargin')}</div>
                                <div className="text-2xl font-bold text-[#fb923c]">{margin.toFixed(2)}%</div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center md:text-left">
                                <div className="text-[13px] text-[#9ca3af] mb-2">{t('MarginCalculator.markup')}</div>
                                <div className="text-2xl font-bold text-[#3b82f6]">{markup.toFixed(2)}%</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
