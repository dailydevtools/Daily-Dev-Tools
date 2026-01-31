"use client";

import { useState } from "react";
import { Cake } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";

export default function AgeCalculatorClient() {
    const t = useTranslations('AgeCalculator');
    const [dob, setDob] = useState("");

    const calc = () => {
        if (!dob) return null;
        const start = new Date(dob);
        const now = new Date();

        if (isNaN(start.getTime())) return null;

        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        let days = now.getDate() - start.getDate();

        if (days < 0) {
            months--;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Next Bday
        const nextBday = new Date(now.getFullYear(), start.getMonth(), start.getDate());
        if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
        const diffTime = Math.abs(nextBday.getTime() - now.getTime());
        const daysToBday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return { years, months, days, daysToBday };
    };

    const res = calc();

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">

                    <ToolPageHeader
                        title="Age Calculator"
                        description="Calculate your exact age and seeing upcoming birthdays."
                        icon={<Cake size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-8 text-center">
                        <div className="mb-8">
                            <label className="block mb-3 text-[var(--muted-text)] text-sm font-medium">{t('dob')}</label>
                            <LiquidInput
                                type="date"
                                value={dob}
                                onChange={e => setDob(e.target.value)}
                                className="text-center text-lg cursor-pointer dark:[color-scheme:dark]"
                            />
                        </div>

                        {res && (
                            <div className="grid gap-6 animate-[fadeIn_0.3s_ease-out]">
                                <div className="p-6 bg-neutral-100/50 dark:bg-white/5 rounded-2xl border border-neutral-200/50 dark:border-white/5">
                                    <div className="text-sm text-[var(--muted-text)] mb-2 font-medium">{t('age')}</div>
                                    <div className="flex items-baseline justify-center gap-3">
                                        <span className="text-5xl font-bold text-[var(--foreground)]">{res.years}</span>
                                        <span className="text-base text-[var(--muted-text)]">{t('years')}</span>
                                    </div>
                                    <div className="text-[var(--muted-text)] mt-2">
                                        {res.months} {t('months')}, {res.days} {t('days')}
                                    </div>
                                </div>

                                <div className="p-6 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-200 dark:border-orange-900/30">
                                    <div className="flex items-center justify-center gap-3 text-orange-600 dark:text-orange-400 mb-2 font-medium">
                                        <Cake size={20} /> {t('nextBirthday')}
                                    </div>
                                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                        {res.daysToBday} {t('days')}
                                    </div>
                                </div>
                            </div>
                        )}
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
