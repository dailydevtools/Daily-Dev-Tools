"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";

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

                    <LiquidCard className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('MarginCalculator.cost')} ($)</label>
                                <LiquidInput
                                    type="number"
                                    value={cost} onChange={e => setCost(e.target.value)}
                                    placeholder="50.00"
                                    className="text-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('MarginCalculator.revenue')} ($)</label>
                                <LiquidInput
                                    type="number"
                                    value={revenue} onChange={e => setRevenue(e.target.value)}
                                    placeholder="100.00"
                                    className="text-lg"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-neutral-100/50 dark:bg-white/5 rounded-2xl border border-[var(--border-color)] text-center md:text-left">
                                <div className="text-xs font-medium text-[var(--muted-text)] mb-2 uppercase tracking-wider">{t('MarginCalculator.netProfit')}</div>
                                <div className={`text-3xl font-bold ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>${profit.toFixed(2)}</div>
                            </div>
                            <div className="p-6 bg-neutral-100/50 dark:bg-white/5 rounded-2xl border border-[var(--border-color)] text-center md:text-left">
                                <div className="text-xs font-medium text-[var(--muted-text)] mb-2 uppercase tracking-wider">{t('MarginCalculator.grossMargin')}</div>
                                <div className="text-3xl font-bold text-orange-500">{margin.toFixed(2)}%</div>
                            </div>
                            <div className="p-6 bg-neutral-100/50 dark:bg-white/5 rounded-2xl border border-[var(--border-color)] text-center md:text-left">
                                <div className="text-xs font-medium text-[var(--muted-text)] mb-2 uppercase tracking-wider">{t('MarginCalculator.markup')}</div>
                                <div className="text-3xl font-bold text-blue-500">{markup.toFixed(2)}%</div>
                            </div>
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
