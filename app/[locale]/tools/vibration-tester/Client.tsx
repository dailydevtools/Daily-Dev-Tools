"use client";

import { useState } from "react";
import { Smartphone } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center">
                        <div className="mb-6 p-6 bg-white/5 rounded-xl">
                            <Smartphone size={48} className="text-white mx-auto mb-4" />
                            <div className="text-[#9ca3af]">{t('worksOnly')}</div>
                        </div>

                        <div className="mb-8">
                            <label className="block mb-3 text-[#9ca3af] text-[13px]">{t('duration')}: {duration}</label>
                            <input type="range" min="50" max="2000" step="50" value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-full accent-[#fb923c]" />
                        </div>

                        <div className="grid gap-4">
                            <button onClick={() => vibrate(duration)} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] p-5">
                                {t('vibrateOnce')}
                            </button>
                            <button onClick={() => vibrate([200, 100, 200, 100, 200])} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] p-5">
                                {t('pulsePattern')}
                            </button>
                            <button onClick={() => vibrate([500, 100, 500, 100, 1000])} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] p-5">
                                {t('longPulse')}
                            </button>
                            <button onClick={() => vibrate(0)} className="p-5 rounded-xl bg-[#ef4444] text-white border-none font-semibold cursor-pointer hover:bg-[#dc2626] transition-colors">
                                {t('stop')}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
