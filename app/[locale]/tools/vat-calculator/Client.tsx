"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";

export default function VatCalculatorClient() {
    const t = useTranslations('VatCalculator');
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState("20");

    const net = Number(amount);
    const r = Number(rate) / 100;

    const addedVat = (net * r).toFixed(2);
    const totalWith = (net * (1 + r)).toFixed(2);

    const removedVat = (net - (net / (1 + r))).toFixed(2);
    const totalWithout = (net / (1 + r)).toFixed(2);

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="VAT Calculator"
                        description="Calculate VAT inclusive or exclusive amounts instantly."
                        icon={<Calculator size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-10">
                        <div className="flex gap-6 mb-10 flex-col md:flex-row">
                            <div className="flex-1">
                                <label htmlFor="amount" className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('amount')}</label>
                                <LiquidInput
                                    id="amount"
                                    type="number" value={amount} onChange={e => setAmount(e.target.value)}
                                    placeholder="100.00"
                                    className="text-lg"
                                />
                            </div>
                            <div className="w-full md:w-[120px]">
                                <label htmlFor="rate" className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('rate')}</label>
                                <LiquidInput
                                    id="rate"
                                    type="number" value={rate} onChange={e => setRate(e.target.value)}
                                    className="text-lg"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-neutral-100 dark:bg-white/5 rounded-2xl border border-neutral-200 dark:border-white/5">
                                <div className="text-[13px] text-[var(--muted-text)] mb-4">{t('addVat')}</div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-neutral-600 dark:text-neutral-400">{t('netAmount')}</span>
                                    <span className="text-[var(--foreground)]">{amount || "0.00"}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-neutral-600 dark:text-neutral-400">{t('vatAmount')}</span>
                                    <span className="text-[#fb923c]">{addedVat}</span>
                                </div>
                                <div className="h-px bg-neutral-200 dark:bg-white/10 mb-4" />
                                <div className="flex justify-between items-end">
                                    <span className="text-[var(--foreground)] font-semibold">{t('grossTotal')}</span>
                                    <span className="text-2xl font-bold text-[#22c55e]">{totalWith}</span>
                                </div>
                            </div>

                            <div className="p-6 bg-neutral-100 dark:bg-white/5 rounded-2xl border border-neutral-200 dark:border-white/5">
                                <div className="text-[13px] text-[var(--muted-text)] mb-4">{t('removeVat')}</div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-neutral-600 dark:text-neutral-400">{t('grossAmount')}</span>
                                    <span className="text-[var(--foreground)]">{amount || "0.00"}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-neutral-600 dark:text-neutral-400">{t('vatAmount')}</span>
                                    <span className="text-[#fb923c]">{removedVat}</span>
                                </div>
                                <div className="h-px bg-neutral-200 dark:bg-white/10 mb-4" />
                                <div className="flex justify-between items-end">
                                    <span className="text-[var(--foreground)] font-semibold">{t('netTotal')}</span>
                                    <span className="text-2xl font-bold text-[#22c55e]">{totalWithout}</span>
                                </div>
                            </div>
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
