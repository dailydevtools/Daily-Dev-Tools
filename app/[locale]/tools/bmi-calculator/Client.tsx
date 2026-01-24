"use client";

import { useState } from "react";
import { Activity } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
            // lbs -> kg (0.453592)
            // inches -> meters (0.0254)
            // Actually standard formula: 703 * weight(lbs) / height(in)^2
            setBmi((703 * w) / (h * h));
        } else {
            // kg / m^2
            // input is often cm
            h = h / 100;
            setBmi(w / (h * h));
        }
    };

    const getStatus = (b: number) => {
        if (b < 18.5) return { text: t('BmiCalculator.underweight'), color: "#3b82f6" };
        if (b < 25) return { text: t('BmiCalculator.normal'), color: "#22c55e" };
        if (b < 30) return { text: t('BmiCalculator.overweight'), color: "#eab308" };
        return { text: t('BmiCalculator.obese'), color: "#ef4444" };
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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/5 p-1 rounded-xl flex gap-1">
                                <button onClick={() => { setUnit("metric"); setBmi(null); setHeight(""); setWeight(""); }} className={`py-2 px-6 rounded-lg border-none cursor-pointer font-medium ${unit === 'metric' ? 'bg-[#fb923c] text-black' : 'bg-transparent text-[#9ca3af]'}`}>{t('BmiCalculator.metric')}</button>
                                <button onClick={() => { setUnit("imperial"); setBmi(null); setHeight(""); setWeight(""); }} className={`py-2 px-6 rounded-lg border-none cursor-pointer font-medium ${unit === 'imperial' ? 'bg-[#fb923c] text-black' : 'bg-transparent text-[#9ca3af]'}`}>{t('BmiCalculator.imperial')}</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="text-left">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('BmiCalculator.weight')} ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                                <input
                                    type="number"
                                    value={weight} onChange={e => setWeight(e.target.value)}
                                    onKeyUp={e => e.key === 'Enter' && calculate()}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-lg"
                                />
                            </div>
                            <div className="text-left">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('BmiCalculator.height')} ({unit === 'metric' ? 'cm' : 'inches'})</label>
                                <input
                                    type="number"
                                    value={height} onChange={e => setHeight(e.target.value)}
                                    onKeyUp={e => e.key === 'Enter' && calculate()}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-lg"
                                />
                            </div>
                        </div>

                        <button onClick={calculate} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] w-full p-4 text-base">{t('BmiCalculator.calculate')}</button>
                    </div>

                    {bmi !== null && (
                        <div className="mt-6 p-8 rounded-3xl bg-white/5 border border-white/5 text-center animate-[fadeIn_0.5s_ease-out]">
                            <div className="text-sm text-[#9ca3af] mb-2">{t('BmiCalculator.bmiScore')}</div>
                            <div className="text-5xl font-bold text-white mb-2">{bmi.toFixed(1)}</div>
                            <div className="text-xl font-semibold mb-6" style={{ color: getStatus(bmi).color }}>
                                {getStatus(bmi).text}
                            </div>

                            <div className="h-2 w-full bg-white/10 rounded-full relative overflow-hidden">
                                <div className="absolute left-0 w-[18.5%] h-full bg-[#3b82f6]" title={t('BmiCalculator.underweight')} />
                                <div className="absolute left-[18.5%] w-[25%] h-full bg-[#22c55e]" title={t('BmiCalculator.normal')} />
                                <div className="absolute left-[43.5%] w-[20%] h-full bg-[#eab308]" title={t('BmiCalculator.overweight')} />
                                <div className="absolute left-[63.5%] w-[36.5%] h-full bg-[#ef4444]" title={t('BmiCalculator.obese')} />
                                <div
                                    className="absolute top-[-4px] bottom-[-4px] w-1 bg-white rounded-sm shadow-[0_0_10px_white]"
                                    style={{ left: `${Math.min(100, Math.max(0, (bmi / 40) * 100))}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-[#6b7280] mt-2">
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
