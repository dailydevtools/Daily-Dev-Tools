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

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import LiquidSelect from "../../../components/ui/LiquidSelect";

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
                        <LiquidCard className="p-8">
                            <div className="mb-6">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('InterestCalculator.principal')} ($)</label>
                                <LiquidInput type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('InterestCalculator.rate')} (%)</label>
                                <div className="flex gap-4 items-center">
                                    <LiquidInput type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-24 text-center" />
                                    <input type="range" min="1" max="20" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))} className="flex-1 accent-orange-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('InterestCalculator.time')}</label>
                                <input type="range" min="1" max="50" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full mb-3 accent-orange-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none" />
                                <div className="text-center font-bold text-[var(--foreground)]">{years} {t('InterestCalculator.year')}s</div>
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('InterestCalculator.type')}</label>
                                <div className="flex dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200 dark:border-white/5">
                                    <button onClick={() => setType('simple')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${type === 'simple' ? 'bg-white dark:bg-neutral-700 shadow-sm text-orange-500' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}>{t('InterestCalculator.simpleInterest')}</button>
                                    <button onClick={() => setType('compound')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${type === 'compound' ? 'bg-white dark:bg-neutral-700 shadow-sm text-orange-500' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}>{t('InterestCalculator.compoundInterest')}</button>
                                </div>
                            </div>
                            {type === 'compound' && (
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('InterestCalculator.frequency')}</label>
                                    <LiquidSelect
                                        value={frequency.toString()}
                                        onChange={(val) => setFrequency(Number(val))}
                                        options={[
                                            { value: "1", label: t('InterestCalculator.annually') },
                                            { value: "12", label: t('InterestCalculator.monthly') },
                                            { value: "365", label: t('InterestCalculator.daily') }
                                        ]}
                                    />
                                </div>
                            )}
                        </LiquidCard>

                        <LiquidCard className="p-8">
                            <div className="flex gap-8 mb-10 pb-8 border-b border-[var(--border-color)]">
                                <div>
                                    <div className="text-sm font-medium text-[var(--muted-text)] mb-1">{t('InterestCalculator.totalAmount')}</div>
                                    <div className="text-4xl font-bold text-[var(--foreground)]">{result ? format(result.total) : '-'}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-[var(--muted-text)] mb-1">{t('InterestCalculator.totalAmount')}</div>
                                    <div className="text-4xl font-bold text-green-500">{result ? format(result.interest) : '-'}</div>
                                </div>
                            </div>

                            {/* CSS Bar Chart */}
                            <div className="h-[300px] flex items-end gap-1.5 py-5 pb-8 relative">
                                <div className="absolute left-0 bottom-0 w-full h-px bg-[var(--border-color)]"></div>
                                {chartData.map((d: ChartData) => {
                                    const pHeight = (d.principal / maxVal) * 100;
                                    const iHeight = (d.interest / maxVal) * 100;
                                    return (
                                        <div key={d.year} className="flex-1 h-full flex flex-col-reverse relative group cursor-pointer" title={`${t('InterestCalculator.year')} ${d.year}: ${format(d.principal + d.interest)}`}>
                                            <div style={{ height: `${pHeight}%` }} className="bg-blue-500/80 rounded-b-sm group-hover:bg-blue-500 transition-colors" />
                                            <div style={{ height: `${iHeight}%` }} className="bg-green-500/80 rounded-t-sm group-hover:bg-green-500 transition-colors" />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-between text-xs font-medium text-[var(--muted-text)] mt-2">
                                <span>{t('InterestCalculator.year')} 1</span>
                                <span>{t('InterestCalculator.year')} {years}</span>
                            </div>

                            <div className="flex justify-center gap-6 mt-6">
                                <div className="flex items-center gap-2 text-sm text-[var(--muted-text)]">
                                    <div className="w-3 h-3 rounded-sm bg-blue-500" /> {t('InterestCalculator.principal')}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[var(--muted-text)]">
                                    <div className="w-3 h-3 rounded-sm bg-green-500" /> {t('InterestCalculator.interest')}
                                </div>
                            </div>
                        </LiquidCard>
                    </div>

                </div>
            </div>
        </main>
    );
}
