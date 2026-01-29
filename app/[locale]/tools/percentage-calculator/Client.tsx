"use client";

import { useState } from "react";
import { Percent } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";

export default function PercentageCalculatorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [val3, setVal3] = useState("");
    const [val4, setVal4] = useState("");
    const [val5, setVal5] = useState("");
    const [val6, setVal6] = useState("");

    const res1 = val1 && val2 ? ((Number(val1) / 100) * Number(val2)).toFixed(2) : "-";
    const res2 = val3 && val4 ? ((Number(val3) / Number(val4)) * 100).toFixed(2) : "-";
    const res3 = val5 && val6 ? (((Number(val6) - Number(val5)) / Number(val5)) * 100).toFixed(2) : "-";

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title={tTools('percentage-calculator.name')}
                        description={tTools('percentage-calculator.description')}
                        icon={<Percent size={28} className="text-[#fb923c]" />}
                    />

                    <div className="flex flex-col gap-6">

                        <LiquidCard className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex flex-wrap items-center gap-3 flex-1 text-[var(--foreground)] text-lg justify-center md:justify-start">
                                <span>{t('PercentageCalculator.whatIs')}</span>
                                <LiquidInput type="number" value={val1} onChange={e => setVal1(e.target.value)} className="w-24 p-2 text-center h-10" />
                                <span>{t('PercentageCalculator.of')}</span>
                                <LiquidInput type="number" value={val2} onChange={e => setVal2(e.target.value)} className="w-24 p-2 text-center h-10" />
                                <span>?</span>
                            </div>
                            <div className="text-[32px] font-bold text-orange-500 min-w-[100px] text-right">{res1}</div>
                        </LiquidCard>

                        <LiquidCard className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex flex-wrap items-center gap-3 flex-1 text-[var(--foreground)] text-lg justify-center md:justify-start">
                                <LiquidInput type="number" value={val3} onChange={e => setVal3(e.target.value)} className="w-24 p-2 text-center h-10" />
                                <span>{t('PercentageCalculator.isWhatPercentOf')}</span>
                                <LiquidInput type="number" value={val4} onChange={e => setVal4(e.target.value)} className="w-24 p-2 text-center h-10" />
                                <span>?</span>
                            </div>
                            <div className="text-[32px] font-bold text-orange-500 min-w-[100px] text-right">{res2}%</div>
                        </LiquidCard>

                        <LiquidCard className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex flex-wrap items-center gap-3 flex-1 text-[var(--foreground)] text-lg justify-center md:justify-start">
                                <span>{t('PercentageCalculator.percentChangeFrom')}</span>
                                <LiquidInput type="number" value={val5} onChange={e => setVal5(e.target.value)} className="w-24 p-2 text-center h-10" />
                                <span>{t('PercentageCalculator.to')}</span>
                                <LiquidInput type="number" value={val6} onChange={e => setVal6(e.target.value)} className="w-24 p-2 text-center h-10" />
                                <span>?</span>
                            </div>
                            <div className={`text-[32px] font-bold min-w-[100px] text-right ${Number(res3) > 0 ? 'text-green-500' : 'text-orange-500'}`}>{res3}%</div>
                        </LiquidCard>

                    </div>

                </div>
            </div>
        </main>
    );
}
