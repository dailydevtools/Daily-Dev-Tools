"use client";

import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import LiquidSelect from "../../../components/ui/LiquidSelect";
import { LiquidSlider } from "../../../components/ui/LiquidSlider";

export default function LoanCalculatorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [amount, setAmount] = useState(100000);
    const [rate, setRate] = useState(5);
    const [term, setTerm] = useState(30);
    const [termType, setTermType] = useState<"years" | "months">("years");

    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    useEffect(() => {
        calculate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount, rate, term, termType]);

    const calculate = () => {
        const p = amount;
        const r = rate / 100 / 12;
        const n = termType === "years" ? term * 12 : term;

        if (p <= 0 || r <= 0 || n <= 0) return;

        const x = Math.pow(1 + r, n);
        const monthly = (p * x * r) / (x - 1);

        if (isFinite(monthly)) {
            setMonthlyPayment(monthly);
            setTotalPayment(monthly * n);
            setTotalInterest((monthly * n) - p);
        }
    };

    const formatMoney = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

    // Chart calculation
    const total = amount + totalInterest;
    const pPerc = total > 0 ? (amount / total) * 100 : 100;

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">

                    <ToolPageHeader
                        title={tTools('loan-calculator.name')}
                        description={tTools('loan-calculator.description')}
                        icon={<Calculator size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <LiquidCard className="p-8">
                            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
                                <Calculator size={20} className="text-orange-500" /> {t('LoanCalculator.loanDetails')}
                            </h2>

                            <div className="mb-6">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('LoanCalculator.loanAmount')} ($)</label>
                                <LiquidInput
                                    type="number"
                                    value={amount} onChange={e => setAmount(Number(e.target.value))}
                                />
                                <LiquidSlider
                                    min={1000} max={1000000} step={1000}
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    containerClassName="mt-6"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('LoanCalculator.interestRate')} (%)</label>
                                <LiquidInput
                                    type="number"
                                    value={rate} onChange={e => setRate(Number(e.target.value))}
                                />
                                <LiquidSlider
                                    min={0.1} max={30} step={0.1}
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    containerClassName="mt-6"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('LoanCalculator.loanTerm')}</label>
                                <div className="flex gap-3">
                                    <LiquidInput
                                        type="number"
                                        value={term} onChange={e => setTerm(Number(e.target.value))}
                                        className="flex-1"
                                    />
                                    <LiquidSelect
                                        value={termType}
                                        onChange={(val) => setTermType(val as any)}
                                        className="w-32"
                                        options={[
                                            { value: "years", label: t('LoanCalculator.years') },
                                            { value: "months", label: t('LoanCalculator.months') }
                                        ]}
                                    />
                                </div>
                            </div>
                        </LiquidCard>

                        <LiquidCard className="p-8 text-center">
                            <div className="mb-8">
                                <div className="text-sm font-medium text-[var(--muted-text)] mb-2 uppercase tracking-wider">{t('LoanCalculator.monthlyPayment')}</div>
                                <div className="text-5xl font-bold text-green-500">{formatMoney(monthlyPayment)}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                                <div className="p-4 bg-neutral-50 dark:bg-white/5 rounded-xl border border-[var(--border-color)]">
                                    <div className="text-xs font-medium text-[var(--muted-text)] mb-1">{t('LoanCalculator.totalInterest')}</div>
                                    <div className="text-lg font-bold text-orange-500">{formatMoney(totalInterest)}</div>
                                </div>
                                <div className="p-4 bg-neutral-50 dark:bg-white/5 rounded-xl border border-[var(--border-color)]">
                                    <div className="text-xs font-medium text-[var(--muted-text)] mb-1">{t('LoanCalculator.totalPayment')}</div>
                                    <div className="text-lg font-bold text-[var(--foreground)]">{formatMoney(totalPayment)}</div>
                                </div>
                            </div>

                            {/* CSS Only Pie Chart */}
                            <div className="flex justify-center items-center h-[200px] mb-4 relative">
                                <div className="relative w-40 h-40 rounded-full shadow-xl" style={{
                                    background: `conic-gradient(#3b82f6 0% ${pPerc}%, #f97316 ${pPerc}% 100%)`
                                }}>
                                    <div className="absolute inset-[30px] bg-white dark:bg-[#111] rounded-full flex items-center justify-center shadow-inner" />
                                </div>
                            </div>

                            <div className="flex justify-center gap-6">
                                <div className="flex items-center gap-2 text-sm text-[var(--muted-text)]">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" /> {t('LoanCalculator.principal')}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[var(--muted-text)]">
                                    <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm" /> {t('LoanCalculator.interest')}
                                </div>
                            </div>

                        </LiquidCard>
                    </div>

                </div>
            </div>
        </main>
    );
}
