"use client";

import { useState } from "react";
import { Ratio } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function AspectRatioClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [w1, setW1] = useState<number>(1920);
    const [h1, setH1] = useState<number>(1080);
    const [w2, setW2] = useState<number>(1280);
    const [h2, setH2] = useState<number>(720);

    const calculateH2 = (newW2: number) => {
        setW2(newW2);
        setH2(Math.round((newW2 * h1) / w1));
    };

    const calculateW2 = (newH2: number) => {
        setH2(newH2);
        setW2(Math.round((newH2 * w1) / h1));
    };

    const ratio = (w1 / h1).toFixed(3);
    const common = w1 === 1920 && h1 === 1080 ? "16:9" : `${w1}:${h1}`;

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">

                    <ToolPageHeader
                        title={tTools('aspect-ratio.name')}
                        description={tTools('aspect-ratio.description')}
                        icon={<Ratio size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">

                        <div className="flex gap-6 items-center mb-10">
                            <div className="flex-1">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('AspectRatioCalculator.originalWidth')}</label>
                                <input
                                    type="number" value={w1} onChange={e => setW1(Number(e.target.value))}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('AspectRatioCalculator.originalHeight')}</label>
                                <input
                                    type="number" value={h1} onChange={e => setH1(Number(e.target.value))}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                />
                            </div>
                        </div>

                        <div className="h-px bg-white/10 mb-10" />

                        <div className="flex gap-6 items-center">
                            <div className="flex-1">
                                <label className="block mb-2 text-[#fb923c] text-[13px]">{t('AspectRatioCalculator.newWidth')}</label>
                                <input
                                    type="number" value={w2} onChange={e => calculateH2(Number(e.target.value))}
                                    className="input-field w-full p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#fb923c]"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-[#fb923c] text-[13px]">{t('AspectRatioCalculator.newHeight')}</label>
                                <input
                                    type="number" value={h2} onChange={e => calculateW2(Number(e.target.value))}
                                    className="input-field w-full p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#fb923c]"
                                />
                            </div>
                        </div>

                        <div className="mt-10 text-center">
                            <div className="text-[13px] text-[#9ca3af] mb-2">{t('AspectRatioCalculator.resultRatio')}</div>
                            <div className="text-5xl font-bold text-white">{common === "16:9" ? "16:9" : ratio}</div>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
