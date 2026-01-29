"use client";

import { useState } from "react";
import { Tag } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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
                        <LiquidCard className="p-8">

                            <div className="mb-5">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('DiscountCalculator.originalPrice')} ($)</label>
                                <LiquidInput
                                    type="number"
                                    value={price} onChange={e => setPrice(e.target.value)}
                                    placeholder="100.00"
                                    className="text-lg"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('DiscountCalculator.discountPercent')} (% off)</label>
                                <div className="flex flex-col gap-3">
                                    <LiquidInput
                                        type="number"
                                        value={discount} onChange={e => setDiscount(e.target.value)}
                                        placeholder="20"
                                        className="text-lg"
                                    />
                                    <div className="flex gap-2 flex-wrap">
                                        {[10, 20, 30, 50].map(d => (
                                            <button
                                                key={d}
                                                onClick={() => setDiscount(String(d))}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-white/5 border border-transparent hover:border-orange-500/30 hover:text-orange-500 transition-colors text-[var(--muted-text)]"
                                            >
                                                {d}%
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('DiscountCalculator.salesTax')} (%) (Optional)</label>
                                <LiquidInput
                                    type="number"
                                    value={tax} onChange={e => setTax(e.target.value)}
                                    placeholder="0"
                                    className="text-lg"
                                />
                            </div>
                        </LiquidCard>

                        <LiquidCard className="p-8 text-center bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
                            <div className="mb-8">
                                <div className="text-sm text-green-600 dark:text-green-400 mb-2 font-medium uppercase tracking-wider">{t('DiscountCalculator.finalPrice')}</div>
                                <div className="text-[48px] font-bold text-[var(--foreground)] leading-none tracking-tight">{format(final)}</div>
                            </div>

                            <div className="border-t border-[var(--border-color)] pt-6 flex flex-col gap-3">
                                <div className="flex justify-between text-[var(--muted-text)] text-sm">
                                    <span>{t('DiscountCalculator.originalPrice')}</span>
                                    <span className="line-through decoration-red-500/50">{format(parseFloat(price) || 0)}</span>
                                </div>
                                <div className="flex justify-between text-green-600 dark:text-green-500 text-base font-medium">
                                    <span>{t('DiscountCalculator.youSave')}</span>
                                    <span>-{format(savings)}</span>
                                </div>
                                {parseFloat(tax) > 0 && (
                                    <div className="flex justify-between text-orange-500 text-sm">
                                        <span>{t('DiscountCalculator.salesTax')} ({tax}%)</span>
                                        <span>+{format(taxAmount)}</span>
                                    </div>
                                )}
                            </div>
                        </LiquidCard>
                    </div>

                </div>
            </div>
        </main>
    );
}
