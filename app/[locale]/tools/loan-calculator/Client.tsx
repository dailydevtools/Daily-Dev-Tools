"use client";

import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Calculator size={20} color="#fb923c" /> {t('LoanCalculator.loanDetails')}
                            </h2>

                            <div className="mb-5">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('LoanCalculator.loanAmount')} ($)</label>
                                <input
                                    type="number"
                                    value={amount} onChange={e => setAmount(Number(e.target.value))}
                                    className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white text-base"
                                />
                                <input
                                    type="range" min="1000" max="1000000" step="1000"
                                    value={amount} onChange={e => setAmount(Number(e.target.value))}
                                    className="w-full mt-2 accent-[#fb923c]"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('LoanCalculator.interestRate')} (%)</label>
                                <input
                                    type="number"
                                    value={rate} onChange={e => setRate(Number(e.target.value))}
                                    className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white text-base"
                                />
                                <input
                                    type="range" min="0.1" max="30" step="0.1"
                                    value={rate} onChange={e => setRate(Number(e.target.value))}
                                    className="w-full mt-2 accent-[#fb923c]"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('LoanCalculator.loanTerm')}</label>
                                <div className="flex gap-3">
                                    <input
                                        type="number"
                                        value={term} onChange={e => setTerm(Number(e.target.value))}
                                        className="input-field flex-1 p-3 rounded-lg bg-black/30 border border-white/10 text-white text-base"
                                    />
                                    <select
                                        value={termType} onChange={e => setTermType(e.target.value as any)}
                                        className="px-4 rounded-lg bg-[#111] text-white border border-[#333]"
                                    >
                                        <option value="years">{t('LoanCalculator.years')}</option>
                                        <option value="months">{t('LoanCalculator.months')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 text-center">
                            <div className="mb-8">
                                <div className="text-sm text-[#9ca3af] mb-2">{t('LoanCalculator.monthlyPayment')}</div>
                                <div className="text-5xl font-bold text-[#22c55e]">{formatMoney(monthlyPayment)}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                                <div className="p-4 bg-white/5 rounded-xl">
                                    <div className="text-xs text-[#9ca3af]">{t('LoanCalculator.totalInterest')}</div>
                                    <div className="text-lg font-semibold text-[#f97316]">{formatMoney(totalInterest)}</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl">
                                    <div className="text-xs text-[#9ca3af]">{t('LoanCalculator.totalPayment')}</div>
                                    <div className="text-lg font-semibold text-white">{formatMoney(totalPayment)}</div>
                                </div>
                            </div>

                            {/* CSS Only Pie Chart */}
                            <div className="flex justify-center items-center h-[200px]">
                                <div className="relative w-40 h-40 rounded-full" style={{
                                    background: `conic-gradient(#3b82f6 0% ${pPerc}%, #f97316 ${pPerc}% 100%)`
                                }}>
                                    <div className="absolute inset-[30px] bg-[#000] rounded-full" />
                                </div>
                            </div>
                            <div className="flex justify-center gap-4 mt-4">
                                <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                                    <div className="w-3 h-3 rounded-full bg-[#3b82f6]" /> {t('LoanCalculator.principal')}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                                    <div className="w-3 h-3 rounded-full bg-[#f97316]" /> {t('LoanCalculator.interest')}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
