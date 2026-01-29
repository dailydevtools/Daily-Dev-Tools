"use client";

import { useState } from "react";
import { Fuel } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";

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

                    <LiquidCard className="p-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('FuelCalculator.distance')} <span className="text-xs opacity-70">(miles/km)</span></label>
                                <LiquidInput
                                    type="number" value={distance} onChange={e => setDistance(e.target.value)}
                                    className="text-lg" placeholder="100"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('FuelCalculator.fuelEfficiency')} <span className="text-xs opacity-70">(MPG or km/L)</span></label>
                                <LiquidInput
                                    type="number" value={efficiency} onChange={e => setEfficiency(e.target.value)}
                                    className="text-lg" placeholder="30"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('FuelCalculator.fuelPrice')} <span className="text-xs opacity-70">($)</span></label>
                                <LiquidInput
                                    type="number" value={price} onChange={e => setPrice(e.target.value)}
                                    className="text-lg" placeholder="3.50"
                                />
                            </div>
                        </div>

                        <div className="p-8 bg-neutral-100 dark:bg-white/5 rounded-2xl border border-neutral-200 dark:border-white/5 text-center transition-all">
                            <div className="text-sm text-[var(--muted-text)] mb-4 font-medium uppercase tracking-wider">{t('FuelCalculator.totalCost')}</div>
                            <div className="text-6xl font-bold text-orange-500 tracking-tighter drop-shadow-sm">${total.toFixed(2)}</div>
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
