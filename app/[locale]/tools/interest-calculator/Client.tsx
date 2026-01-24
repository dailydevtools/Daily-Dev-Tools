"use client";

import { useState, useEffect } from "react";
import { DollarSign } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

interface ChartData {
    year: number;
    principal: number;
    interest: number;
}

export default function InterestCalculatorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(5);
    const [years, setYears] = useState(10);
    const [type, setType] = useState<"compound" | "simple">("compound");
    const [frequency, setFrequency] = useState(12);

    const [result, setResult] = useState<{ total: number, interest: number } | null>(null);
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        calculate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [principal, rate, years, type, frequency]);

    const calculate = () => {
        const P = principal;
        const r = rate / 100;
        const t1 = years;
        const n = frequency;

        let A = 0;
        let data: ChartData[] = [];

        if (type === "simple") {
            A = P * (1 + r * t1);
            for (let i = 1; i <= t1; i++) {
                data.push({ year: i, principal: P, interest: (P * r * i) });
            }
        } else {
            A = P * Math.pow((1 + r / n), (n * t1));
            for (let i = 1; i <= t1; i++) {
                const val = P * Math.pow((1 + r / n), (n * i));
                data.push({ year: i, principal: P, interest: val - P });
            }
        }

        setResult({ total: A, interest: A - P });
        setChartData(data);
    };

    const format = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

    const maxVal = result ? result.total : 0;

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title={tTools('interest-calculator.name')}
                        description={tTools('interest-calculator.description')}
                        icon={<DollarSign size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-[minmax(300px,1fr)_2fr] gap-6 items-start">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">
                            <div className="mb-5">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('InterestCalculator.principal')} ($)</label>
                                <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white" />
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('InterestCalculator.rate')} (%)</label>
                                <div className="flex gap-3">
                                    <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="input-field flex-1 p-3 rounded-lg bg-black/30 border border-white/10 text-white" />
                                    <input type="range" min="1" max="20" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))} className="flex-1 accent-[#fb923c]" />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('InterestCalculator.time')}</label>
                                <input type="range" min="1" max="50" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full mb-2 accent-[#fb923c]" />
                                <div className="text-center font-bold text-white">{years} {t('InterestCalculator.year')}s</div>
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('InterestCalculator.type')}</label>
                                <div className="flex gap-3">
                                    <button onClick={() => setType('simple')} className={`flex-1 p-3 rounded-lg ${type === 'simple' ? 'inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)]' : 'inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]'}`}>{t('InterestCalculator.simpleInterest')}</button>
                                    <button onClick={() => setType('compound')} className={`flex-1 p-3 rounded-lg ${type === 'compound' ? 'inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)]' : 'inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]'}`}>{t('InterestCalculator.compoundInterest')}</button>
                                </div>
                            </div>
                            {type === 'compound' && (
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('InterestCalculator.frequency')}</label>
                                    <select value={frequency} onChange={e => setFrequency(Number(e.target.value))} className="w-full p-3 rounded-lg bg-[#111] border-none text-white">
                                        <option value={1}>{t('InterestCalculator.annually')}</option>
                                        <option value={12}>{t('InterestCalculator.monthly')}</option>
                                        <option value={365}>{t('InterestCalculator.daily')}</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">
                            <div className="flex gap-8 mb-8">
                                <div>
                                    <div className="text-[13px] text-[#9ca3af]">{t('InterestCalculator.totalAmount')}</div>
                                    <div className="text-[32px] font-bold text-white">{result ? format(result.total) : '-'}</div>
                                </div>
                                <div>
                                    <div className="text-[13px] text-[#9ca3af]">{t('InterestCalculator.totalAmount')}</div>
                                    <div className="text-[32px] font-bold text-[#22c55e]">{result ? format(result.interest) : '-'}</div>
                                </div>
                            </div>

                            {/* CSS Bar Chart */}
                            <div className="h-[300px] flex items-end gap-2 py-5">
                                {chartData.map((d: ChartData) => {
                                    const pHeight = (d.principal / maxVal) * 100;
                                    const iHeight = (d.interest / maxVal) * 100;
                                    return (
                                        <div key={d.year} className="flex-1 h-full flex flex-col-reverse relative group" title={`${t('InterestCalculator.year')} ${d.year}: ${format(d.principal + d.interest)}`}>
                                            <div style={{ height: `${pHeight}%` }} className="bg-[#3b82f6] rounded-b-sm opacity-80" />
                                            <div style={{ height: `${iHeight}%` }} className="bg-[#22c55e] rounded-t-sm" />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-between text-xs text-[#6b7280] mt-2">
                                <span>{t('InterestCalculator.year')} 1</span>
                                <span>{t('InterestCalculator.year')} {years}</span>
                            </div>

                            <div className="flex justify-center gap-4 mt-4">
                                <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                                    <div className="w-3 h-3 rounded-sm bg-[#3b82f6]" /> {t('InterestCalculator.principal')}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                                    <div className="w-3 h-3 rounded-sm bg-[#22c55e]" /> {t('InterestCalculator.interest')}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
