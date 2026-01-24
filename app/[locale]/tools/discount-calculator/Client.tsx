"use client";

import { useState } from "react";
import { Tag } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function DiscountCalculatorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [tax, setTax] = useState("");

    const calculate = () => {
        const p = parseFloat(price) || 0;
        const d = parseFloat(discount) || 0;
        const t = parseFloat(tax) || 0;

        const savings = p * (d / 100);
        const afterDesc = p - savings;
        const taxAmount = afterDesc * (t / 100);
        const final = afterDesc + taxAmount;

        return { savings, afterDesc, taxAmount, final };
    };

    const { savings, afterDesc, taxAmount, final } = calculate();
    const format = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title={tTools('discount-calculator.name')}
                        description={tTools('discount-calculator.description')}
                        icon={<Tag size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">

                            <div className="mb-5">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('DiscountCalculator.originalPrice')} ($)</label>
                                <input
                                    type="number"
                                    value={price} onChange={e => setPrice(e.target.value)}
                                    placeholder="100.00"
                                    className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white text-lg"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('DiscountCalculator.discountPercent')} (% off)</label>
                                <div className="flex gap-3 flex-wrap">
                                    <input
                                        type="number"
                                        value={discount} onChange={e => setDiscount(e.target.value)}
                                        placeholder="20"
                                        className="input-field flex-1 p-3 rounded-lg bg-black/30 border border-white/10 text-white text-lg min-w-[80px]"
                                    />
                                    {[10, 20, 30, 50].map(d => (
                                        <button key={d} onClick={() => setDiscount(String(d))} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2 px-4">{d}%</button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('DiscountCalculator.salesTax')} (%) (Optional)</label>
                                <input
                                    type="number"
                                    value={tax} onChange={e => setTax(e.target.value)}
                                    placeholder="0"
                                    className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white text-lg"
                                />
                            </div>
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/5">
                            <div className="mb-6">
                                <div className="text-sm text-[#9ca3af] mb-2">{t('DiscountCalculator.finalPrice')}</div>
                                <div className="text-[56px] font-bold text-white leading-none">{format(final)}</div>
                            </div>

                            <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
                                <div className="flex justify-between text-[#9ca3af] text-sm">
                                    <span>{t('DiscountCalculator.originalPrice')}</span>
                                    <span className="line-through">{format(parseFloat(price) || 0)}</span>
                                </div>
                                <div className="flex justify-between text-[#22c55e] text-base font-medium">
                                    <span>{t('DiscountCalculator.youSave')}</span>
                                    <span>-{format(savings)}</span>
                                </div>
                                {parseFloat(tax) > 0 && (
                                    <div className="flex justify-between text-[#f97316] text-sm">
                                        <span>{t('DiscountCalculator.salesTax')} ({tax}%)</span>
                                        <span>+{format(taxAmount)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
