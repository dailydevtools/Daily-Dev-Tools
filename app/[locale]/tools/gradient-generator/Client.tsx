"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Palette } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
                        icon={<Palette size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10">
                        {/* Controls */}
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">{t('config')}</h2>

                            <div className="mb-6">
                                <label className="block text-sm text-[#9ca3af] mb-3">{t('colors')}</label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <input
                                            type="color"
                                            value={color1}
                                            onChange={(e) => setColor1(e.target.value)}
                                            className="w-full h-12 rounded-lg border-none cursor-pointer bg-transparent"
                                        />
                                        <div className="text-center mt-2 text-[13px] text-[#d1d5db] font-mono">{color1}</div>
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="color"
                                            value={color2}
                                            onChange={(e) => setColor2(e.target.value)}
                                            className="w-full h-12 rounded-lg border-none cursor-pointer bg-transparent"
                                        />
                                        <div className="text-center mt-2 text-[13px] text-[#d1d5db] font-mono">{color2}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm text-[#9ca3af] mb-3">{t('type')}</label>
                                <div className="flex bg-white/5 rounded-lg p-1">
                                    {['linear', 'radial'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setType(t)}
                                            className={`flex-1 py-2 rounded-md border-none text-sm font-medium cursor-pointer capitalize ${type === t ? 'bg-white/10 text-white' : 'bg-transparent text-[#6b7280]'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {type === 'linear' && (
                                <div className="mb-8">
                                    <div className="flex justify-between mb-3">
                                        <label className="text-sm text-[#9ca3af]">{t('angle')}</label>
                                        <span className="text-sm text-white">{angle}°</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={angle}
                                        onChange={(e) => setAngle(Number(e.target.value))}
                                        className="w-full cursor-pointer"
                                    />
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button onClick={randomize} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] flex-1 flex justify-center items-center gap-2">
                                    <RefreshCw size={16} /> {t('random')}
                                </button>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="flex flex-col gap-5">
                            <div
                                className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 flex-1 min-h-[300px] rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10"
                                style={{ background: gradient }}
                            />

                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-5 flex items-center justify-between gap-4">
                                <code className="font-mono text-[#fb923c] text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                                    {css}
                                </code>
                                <button
                                    onClick={copyToClipboard}
                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-2 px-4 text-[13px] flex items-center gap-2"
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                    {copied ? t('copied') : t('copyCss')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
