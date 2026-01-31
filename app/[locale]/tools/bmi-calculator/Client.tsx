"use client";

import { useState } from "react";
import { Activity } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import LiquidTabs from "../../../components/ui/LiquidTabs";

export default function BMICalculatorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState<number | null>(null);

    const calculate = () => {
        let w = parseFloat(weight);
        let h = parseFloat(height);
        if (!w || !h) return;

        if (unit === "imperial") {
            setBmi((703 * w) / (h * h));
        } else {
            h = h / 100;
            setBmi(w / (h * h));
        }
    };

    const getStatus = (b: number) => {
        if (b < 18.5) return { text: t('BmiCalculator.underweight'), color: "text-blue-500" };
        if (b < 25) return { text: t('BmiCalculator.normal'), color: "text-green-500" };
        if (b < 30) return { text: t('BmiCalculator.overweight'), color: "text-yellow-500" };
        return { text: t('BmiCalculator.obese'), color: "text-red-500" };
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">

                    <ToolPageHeader
                        title={tTools('bmi-calculator.name')}
                        description={tTools('bmi-calculator.description')}
                        icon={<Activity size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-10 text-center">
                        <div className="flex justify-center mb-8">
                            <LiquidTabs
                                tabs={['metric', 'imperial']}
                                activeTab={unit}
                                onChange={(tab) => { setUnit(tab as "metric" | "imperial"); setBmi(null); setHeight(""); setWeight(""); }}
                                labels={{
                                    metric: `${t('BmiCalculator.metric')} (kg/cm)`,
                                    imperial: `${t('BmiCalculator.imperial')} (lbs/in)`
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="text-left">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('BmiCalculator.weight')} ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                                <LiquidInput
                                    type="number"
                                    value={weight} onChange={e => setWeight(e.target.value)}
                                    onKeyUp={e => e.key === 'Enter' && calculate()}
                                    className="text-lg"
                                />
                            </div>
                            <div className="text-left">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('BmiCalculator.height')} ({unit === 'metric' ? 'cm' : 'inches'})</label>
                                <LiquidInput
                                    type="number"
                                    value={height} onChange={e => setHeight(e.target.value)}
                                    onKeyUp={e => e.key === 'Enter' && calculate()}
                                    className="text-lg"
                                />
                            </div>
                        </div>

                        <LiquidButton onClick={calculate} className="w-full h-14 text-base">
                            {t('BmiCalculator.calculate')}
                        </LiquidButton>
                    </LiquidCard>

                    {bmi !== null && (
                        <div className="mt-6 p-8 rounded-[24px] bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md border border-[var(--border-color)] text-center animate-[fadeIn_0.5s_ease-out]">
                            <div className="text-sm text-[var(--muted-text)] mb-2 font-medium">{t('BmiCalculator.bmiScore')}</div>
                            <div className="text-6xl font-bold text-[var(--foreground)] mb-3 tracking-tight">{bmi.toFixed(1)}</div>
                            <div className={`text-xl font-semibold mb-8 ${getStatus(bmi).color}`}>
                                {getStatus(bmi).text}
                            </div>

                            <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full relative overflow-hidden">
                                <div className="absolute left-0 w-[18.5%] h-full bg-blue-400" title={t('BmiCalculator.underweight')} />
                                <div className="absolute left-[18.5%] w-[25%] h-full bg-green-500" title={t('BmiCalculator.normal')} />
                                <div className="absolute left-[43.5%] w-[20%] h-full bg-yellow-400" title={t('BmiCalculator.overweight')} />
                                <div className="absolute left-[63.5%] w-[36.5%] h-full bg-red-500" title={t('BmiCalculator.obese')} />
                                <div
                                    className="absolute top-0 bottom-0 w-1.5 bg-white dark:bg-neutral-900 ring-2 ring-black/10 dark:ring-white/20 rounded-full shadow-lg z-10 transition-all duration-1000 ease-out"
                                    style={{ left: `${Math.min(100, Math.max(0, (bmi / 40) * 100))}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[11px] font-mono text-[var(--muted-text)] mt-3 px-1">
                                <span>0</span>
                                <span>18.5</span>
                                <span>25</span>
                                <span>30</span>
                                <span>40+</span>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
