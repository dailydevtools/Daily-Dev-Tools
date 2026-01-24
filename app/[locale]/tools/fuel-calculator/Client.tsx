"use client";

import { useState } from "react";
import { Fuel } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function FuelCalculatorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [distance, setDistance] = useState("100");
    const [efficiency, setEfficiency] = useState("30"); // MPG
    const [price, setPrice] = useState("3.50"); // per gallon

    const dist = Number(distance);
    const eff = Number(efficiency);
    const p = Number(price);

    const total = (dist && eff) ? (dist / eff) * p : 0;

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title={tTools('fuel-calculator.name')}
                        description={tTools('fuel-calculator.description')}
                        icon={<Fuel size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('FuelCalculator.distance')} (miles/km)</label>
                                <input
                                    type="number" value={distance} onChange={e => setDistance(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-lg" placeholder="100"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('FuelCalculator.fuelEfficiency')} (MPG or km/L)</label>
                                <input
                                    type="number" value={efficiency} onChange={e => setEfficiency(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-lg" placeholder="30"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('FuelCalculator.fuelPrice')} ($)</label>
                                <input
                                    type="number" value={price} onChange={e => setPrice(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-lg" placeholder="3.50"
                                />
                            </div>
                        </div>

                        <div className="p-10 bg-white/5 rounded-2xl border border-white/5 text-center">
                            <div className="text-[13px] text-[#9ca3af] mb-4">{t('FuelCalculator.totalCost')}</div>
                            <div className="text-5xl font-bold text-[#fb923c]">${total.toFixed(2)}</div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
