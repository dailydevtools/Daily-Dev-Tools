"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="flex gap-6 mb-10 flex-col md:flex-row">
                            <div className="flex-1">
                                <label htmlFor="amount" className="block mb-2 text-[#9ca3af] text-[13px]">{t('amount')}</label>
                                <input
                                    id="amount"
                                    type="number" value={amount} onChange={e => setAmount(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-transparent dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)] text-lg"
                                    placeholder="100.00"
                                />
                            </div>
                            <div className="w-full md:w-[120px]">
                                <label htmlFor="rate" className="block mb-2 text-[#9ca3af] text-[13px]">{t('rate')}</label>
                                <input
                                    id="rate"
                                    type="number" value={rate} onChange={e => setRate(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-transparent dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)] text-lg"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-neutral-100 dark:bg-white/5 rounded-2xl border border-neutral-200 dark:border-white/5">
                                <div className="text-[13px] text-[#9ca3af] mb-4">{t('addVat')}</div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-[#6b7280]">{t('netAmount')}</span>
                                    <span className="text-white">{amount || "0.00"}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-[#6b7280]">{t('vatAmount')}</span>
                                    <span className="text-[#fb923c]">{addedVat}</span>
                                </div>
                                <div className="h-px bg-white/10 mb-4" />
                                <div className="flex justify-between items-end">
                                    <span className="text-white font-semibold">{t('grossTotal')}</span>
                                    <span className="text-2xl font-bold text-[#22c55e]">{totalWith}</span>
                                </div>
                            </div>

                            <div className="p-6 bg-neutral-100 dark:bg-white/5 rounded-2xl border border-neutral-200 dark:border-white/5">
                                <div className="text-[13px] text-[#9ca3af] mb-4">{t('removeVat')}</div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-[#6b7280]">{t('grossAmount')}</span>
                                    <span className="text-white">{amount || "0.00"}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-[#6b7280]">{t('vatAmount')}</span>
                                    <span className="text-[#fb923c]">{removedVat}</span>
                                </div>
                                <div className="h-px bg-white/10 mb-4" />
                                <div className="flex justify-between items-end">
                                    <span className="text-white font-semibold">{t('netTotal')}</span>
                                    <span className="text-2xl font-bold text-[#22c55e]">{totalWithout}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
