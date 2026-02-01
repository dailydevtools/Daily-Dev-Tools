"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Palette } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import LiquidTabs from "../../../components/ui/LiquidTabs";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidSlider } from "../../../components/ui/LiquidSlider";

export default function GradientGeneratorClient() {
    const t = useTranslations('GradientGenerator');
    const [color1, setColor1] = useState("#f97316");
    const [color2, setColor2] = useState("#facc15");
    const [angle, setAngle] = useState(135);
    const [type, setType] = useState("linear");
    const [copied, setCopied] = useState(false);

    const gradient = type === "linear"
        ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
        : `radial-gradient(circle, ${color1}, ${color2})`;

    const css = `background: ${gradient};`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const randomColor = () => {
        const r = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
        return `#${r()}${r()}${r()}`;
    };

    const randomize = () => {
        setColor1(randomColor());
        setColor2(randomColor());
        setAngle(Math.floor(Math.random() * 360));
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title="CSS Gradient Generator"
                        description="Create beautiful linear and radial CSS gradients visually."
                        icon={<ToolIcon name="Layers" size={32} />}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Controls */}
                        <LiquidCard className="p-8">
                            <h2 className="text-xl font-bold text-[var(--foreground)] mb-8 flex items-center gap-2">
                                <Palette size={20} className="text-orange-500" />
                                {t('config')}
                            </h2>

                            <div className="mb-8">
                                <label className="block text-xs uppercase font-bold tracking-widest text-[var(--muted-text)] mb-4">{t('colors')}</label>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="group">
                                        <div className="relative h-16 w-full rounded-2xl overflow-hidden shadow-sm border border-[var(--border-color)] transition-all group-hover:border-orange-500/50">
                                            <input
                                                type="color"
                                                value={color1}
                                                onChange={(e) => setColor1(e.target.value)}
                                                className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] cursor-pointer border-none bg-transparent p-0 m-0"
                                            />
                                        </div>
                                        <div className="text-center mt-3 text-[11px] text-[var(--muted-text)] font-mono font-bold uppercase tracking-wider">{color1}</div>
                                    </div>
                                    <div className="group">
                                        <div className="relative h-16 w-full rounded-2xl overflow-hidden shadow-sm border border-[var(--border-color)] transition-all group-hover:border-orange-500/50">
                                            <input
                                                type="color"
                                                value={color2}
                                                onChange={(e) => setColor2(e.target.value)}
                                                className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] cursor-pointer border-none bg-transparent p-0 m-0"
                                            />
                                        </div>
                                        <div className="text-center mt-3 text-[11px] text-[var(--muted-text)] font-mono font-bold uppercase tracking-wider">{color2}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8 overflow-hidden">
                                <label className="block text-xs uppercase font-bold tracking-widest text-[var(--muted-text)] mb-4">{t('type')}</label>
                                <div className="flex justify-start">
                                    <LiquidTabs
                                        tabs={['linear', 'radial'] as const}
                                        activeTab={type}
                                        onChange={setType}
                                    />
                                </div>
                            </div>

                            {type === 'linear' && (
                                <div className="mb-10">
                                    <LiquidSlider
                                        label={t('angle')}
                                        valueDisplay={`${angle}°`}
                                        min="0"
                                        max="360"
                                        value={angle}
                                        onChange={(e) => setAngle(Number(e.target.value))}
                                    />
                                </div>
                            )}

                            <div>
                                <LiquidButton onClick={randomize} variant="secondary" className="w-full py-3.5 gap-2 text-sm font-bold">
                                    <RefreshCw size={18} className="transition-transform group-hover:rotate-180 duration-500" />
                                    {t('random')}
                                </LiquidButton>
                            </div>
                        </LiquidCard>

                        {/* Preview */}
                        <div className="flex flex-col gap-6 lg:sticky lg:top-8">
                            <div
                                className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[32px] shadow-2xl flex-1 min-h-[400px] w-full transition-all duration-700 ease-out"
                                style={{ background: gradient }}
                            />

                            <LiquidCard className="p-2 pl-6 flex items-center justify-between gap-4 overflow-hidden">
                                <code className="font-mono text-orange-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap dark:text-orange-400">
                                    {css}
                                </code>
                                <LiquidButton
                                    onClick={copyToClipboard}
                                    className="px-6 py-4 text-xs font-bold gap-2 whitespace-nowrap rounded-[18px]"
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                    {copied ? t('copied') : t('copyCss')}
                                </LiquidButton>
                            </LiquidCard>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
