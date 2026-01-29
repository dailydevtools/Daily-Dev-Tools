"use client";

import { useState } from "react";
import { Ratio } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";

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

                    <LiquidCard className="p-10">

                        <div className="flex gap-6 items-center mb-10">
                            <div className="flex-1">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('AspectRatioCalculator.originalWidth')}</label>
                                <LiquidInput
                                    type="number" value={w1} onChange={e => setW1(Number(e.target.value))}
                                    className="text-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('AspectRatioCalculator.originalHeight')}</label>
                                <LiquidInput
                                    type="number" value={h1} onChange={e => setH1(Number(e.target.value))}
                                    className="text-lg"
                                />
                            </div>
                        </div>

                        <div className="h-px bg-neutral-200 dark:bg-neutral-800 mb-10" />

                        <div className="flex gap-6 items-center">
                            <div className="flex-1">
                                <label className="block mb-2 text-orange-500 font-medium text-sm">{t('AspectRatioCalculator.newWidth')}</label>
                                <LiquidInput
                                    type="number" value={w2} onChange={e => calculateH2(Number(e.target.value))}
                                    className="text-lg border-orange-200 focus:border-orange-500 focus:ring-orange-500/20 text-orange-600 dark:text-orange-400"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-orange-500 font-medium text-sm">{t('AspectRatioCalculator.newHeight')}</label>
                                <LiquidInput
                                    type="number" value={h2} onChange={e => calculateW2(Number(e.target.value))}
                                    className="text-lg border-orange-200 focus:border-orange-500 focus:ring-orange-500/20 text-orange-600 dark:text-orange-400"
                                />
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <div className="text-sm text-[var(--muted-text)] mb-2 font-medium">{t('AspectRatioCalculator.resultRatio')}</div>
                            <div className="text-5xl font-bold text-[var(--foreground)] tracking-tight">{common === "16:9" ? "16:9" : ratio}</div>
                        </div>

                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
