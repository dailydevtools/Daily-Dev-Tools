"use client";

import { useState } from "react";
import { Smartphone } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidSlider } from "../../../components/ui/LiquidSlider";
import { useTranslations } from "next-intl";

export default function VibrationTesterClient() {
    const t = useTranslations('VibrationTester');
    const [duration, setDuration] = useState(200);

    const vibrate = (pattern: number | number[]) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">
                    <ToolPageHeader
                        title="Vibration Tester"
                        description="Test your device's vibration motor online."
                        icon={<Smartphone size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-10 text-center">
                        <div className="mb-6 p-6 bg-neutral-100 dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5 transition-colors">
                            <Smartphone size={48} className="text-orange-500 mx-auto mb-4" />
                            <div className="text-neutral-500 dark:text-neutral-400 font-medium">{t('worksOnly')}</div>
                        </div>

                        <div className="mb-8">
                            <LiquidSlider
                                label={t('duration')}
                                value={duration}
                                min="50"
                                max="2000"
                                step="50"
                                valueDisplay={`${duration}ms`}
                                onChange={e => setDuration(Number(e.target.value))}
                            />
                        </div>

                        <div className="grid gap-4">
                            <LiquidButton onClick={() => vibrate(duration)} className="py-5 shadow-lg shadow-orange-500/20">
                                {t('vibrateOnce')}
                            </LiquidButton>

                            <LiquidButton
                                variant="ghost"
                                onClick={() => vibrate([200, 100, 200, 100, 200])}
                                className="py-5 border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400"
                            >
                                {t('pulsePattern')}
                            </LiquidButton>

                            <LiquidButton
                                variant="ghost"
                                onClick={() => vibrate([500, 100, 500, 100, 1000])}
                                className="py-5 border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400"
                            >
                                {t('longPulse')}
                            </LiquidButton>

                            <button
                                onClick={() => vibrate(0)}
                                className="p-5 rounded-xl bg-red-500 text-white border-none font-semibold cursor-pointer hover:bg-red-600 hover:-translate-y-1 transition-all shadow-lg shadow-red-500/20 active:scale-95 duration-200"
                            >
                                {t('stop')}
                            </button>
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
