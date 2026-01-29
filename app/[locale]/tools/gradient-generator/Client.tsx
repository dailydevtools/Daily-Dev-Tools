"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Palette } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Controls */}
                        <LiquidCard className="p-8">
                            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">{t('config')}</h2>

                            <div className="mb-6">
                                <label className="block text-sm text-[var(--muted-text)] mb-3 font-medium">{t('colors')}</label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <div className="relative h-12 w-full rounded-xl overflow-hidden shadow-sm border border-[var(--border-color)]">
                                            <input
                                                type="color"
                                                value={color1}
                                                onChange={(e) => setColor1(e.target.value)}
                                                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer border-none bg-transparent p-0 m-0"
                                            />
                                        </div>
                                        <div className="text-center mt-2 text-xs text-[var(--muted-text)] font-mono uppercase">{color1}</div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="relative h-12 w-full rounded-xl overflow-hidden shadow-sm border border-[var(--border-color)]">
                                            <input
                                                type="color"
                                                value={color2}
                                                onChange={(e) => setColor2(e.target.value)}
                                                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer border-none bg-transparent p-0 m-0"
                                            />
                                        </div>
                                        <div className="text-center mt-2 text-xs text-[var(--muted-text)] font-mono uppercase">{color2}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm text-[var(--muted-text)] mb-3 font-medium">{t('type')}</label>
                                <div className="dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200 dark:border-white/5 flex">
                                    {['linear', 'radial'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setType(t)}
                                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${type === t ? 'bg-white dark:bg-neutral-700 shadow-sm text-orange-500' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                                        >
                                            {t.charAt(0).toUpperCase() + t.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {type === 'linear' && (
                                <div className="mb-8">
                                    <div className="flex justify-between mb-3">
                                        <label className="text-sm text-[var(--muted-text)] font-medium">{t('angle')}</label>
                                        <span className="text-sm text-[var(--foreground)] font-mono">{angle}°</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={angle}
                                        onChange={(e) => setAngle(Number(e.target.value))}
                                        className="w-full accent-orange-500 cursor-pointer h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none"
                                    />
                                </div>
                            )}

                            <div>
                                <LiquidButton onClick={randomize} variant="secondary" className="w-full gap-2">
                                    <RefreshCw size={16} /> {t('random')}
                                </LiquidButton>
                            </div>
                        </LiquidCard>

                        {/* Preview */}
                        <div className="flex flex-col gap-6">
                            <div
                                className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[24px] shadow-sm flex-1 min-h-[300px] w-full"
                                style={{ background: gradient }}
                            />

                            <LiquidCard className="p-5 flex items-center justify-between gap-4">
                                <code className="font-mono text-orange-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap bg-orange-50 dark:bg-orange-500/10 px-3 py-1 rounded-lg border border-orange-100 dark:border-orange-500/20 w-full">
                                    {css}
                                </code>
                                <LiquidButton
                                    onClick={copyToClipboard}
                                    className="px-4 py-2 text-xs flex items-center gap-2 whitespace-nowrap"
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
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
