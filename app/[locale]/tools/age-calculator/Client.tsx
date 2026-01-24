"use client";

import { useState } from "react";
import { Cake } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center">
                        <div className="mb-8">
                            <label className="block mb-3 text-[#9ca3af] text-[13px]">{t('dob')}</label>
                            <input
                                type="date" value={dob} onChange={e => setDob(e.target.value)}
                                className="input-field w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white text-lg text-center"
                            />
                        </div>

                        {res && (
                            <div className="grid gap-6">
                                <div className="p-6 bg-white/5 rounded-2xl">
                                    <div className="text-[13px] text-[#9ca3af] mb-2">{t('age')}</div>
                                    <div className="flex items-baseline justify-center gap-3">
                                        <span className="text-5xl font-bold text-white">{res.years}</span>
                                        <span className="text-base text-[#9ca3af]">{t('years')}</span>
                                    </div>
                                    <div className="text-[#9ca3af] mt-2">
                                        {res.months} {t('months')}, {res.days} {t('days')}
                                    </div>
                                </div>

                                <div className="p-6 bg-orange-400/10 rounded-2xl border border-orange-400/20">
                                    <div className="flex items-center justify-center gap-3 text-[#fb923c] mb-2">
                                        <Cake size={20} /> {t('nextBirthday')}
                                    </div>
                                    <div className="text-2xl font-bold text-[#fb923c]">
                                        {res.daysToBday} {t('days')}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
