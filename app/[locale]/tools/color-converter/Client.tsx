"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";

export default function ColorConverterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [hex, setHex] = useState("#3b82f6");
    const [rgb, setRgb] = useState("59, 130, 246");
    const [hsl, setHsl] = useState("217, 91%, 60%");

    const hexToRgb = (h: string) => {
        let r = 0, g = 0, b = 0;
        if (h.length === 4) {
            r = parseInt("0x" + h[1] + h[1]);
            g = parseInt("0x" + h[2] + h[2]);
            b = parseInt("0x" + h[3] + h[3]);
        } else if (h.length === 7) {
            r = parseInt("0x" + h[1] + h[2]);
            g = parseInt("0x" + h[3] + h[4]);
            b = parseInt("0x" + h[5] + h[6]);
        }
        return [r, g, b];
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    };

    const handleHexChange = (val: string) => {
        setHex(val);
        if (/^#[0-9A-F]{6}$/i.test(val)) {
            const [r, g, b] = hexToRgb(val);
            setRgb(`${r}, ${g}, ${b}`);
            const [h, s, l] = rgbToHsl(r, g, b);
            setHsl(`${h}, ${s}%, ${l}%`);
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title={tTools('color-converter.name')}
                        description={tTools('color-converter.description')}
                        icon={<Palette size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
                        <div className="flex flex-col gap-6">
                            {/* HEX Input */}
                            <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-blue-500/20 transition-all">
                                <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5 opacity-60">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                        <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">HEX</span>
                                    </div>
                                    <div className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10 shadow-sm" style={{ background: hex }} />
                                </div>
                                <input
                                    type="text"
                                    value={hex}
                                    onChange={e => handleHexChange(e.target.value)}
                                    className="flex-1 w-full bg-transparent border-none p-5 font-mono text-lg text-[var(--foreground)] outline-none uppercase placeholder:text-[var(--muted-text)]"
                                    spellCheck={false}
                                />
                            </LiquidCard>

                            {/* RGB Output */}
                            <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all">
                                <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5 opacity-60">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                        <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">RGB</span>
                                    </div>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(`rgb(${rgb})`)}
                                        className="text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors"
                                        title={t('ColorConverter.copy')}
                                    >
                                        <Palette size={14} className="opacity-0 w-0" /> {/* Placeholder spacing if needed, else explicit Copylucide */}
                                        <span className="text-[10px] bg-neutral-200 dark:bg-white/10 px-2 py-1 rounded inline-flex items-center gap-1 cursor-pointer hover:bg-neutral-300 dark:hover:bg-white/20">
                                            Copy
                                        </span>
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={rgb}
                                    readOnly
                                    className="flex-1 w-full bg-transparent border-none p-5 font-mono text-base text-[var(--muted-text)] outline-none"
                                />
                            </LiquidCard>

                            {/* HSL Output */}
                            <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all">
                                <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5 opacity-60">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                        <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">HSL</span>
                                    </div>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(`hsl(${hsl})`)}
                                        className="text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors"
                                        title={t('ColorConverter.copy')}
                                    >
                                        <span className="text-[10px] bg-neutral-200 dark:bg-white/10 px-2 py-1 rounded inline-flex items-center gap-1 cursor-pointer hover:bg-neutral-300 dark:hover:bg-white/20">
                                            Copy
                                        </span>
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={hsl}
                                    readOnly
                                    className="flex-1 w-full bg-transparent border-none p-5 font-mono text-base text-[var(--muted-text)] outline-none"
                                />
                            </LiquidCard>

                            <div className="text-xs text-[var(--muted-text)] opacity-60 pl-1">{t('ColorConverter.hexToRgbNote')}</div>
                        </div>

                        {/* Preview Column */}
                        <div className="flex flex-col gap-6 items-center justify-center h-full min-h-[300px] bg-[var(--card-bg)] rounded-[30px] border border-[var(--card-border)] backdrop-blur-xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-neutral-50/30 dark:bg-white/5 z-0" />

                            <div className="relative z-10 flex flex-col items-center gap-6">
                                <div
                                    className="w-[200px] h-[200px] rounded-full shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] border-8 border-white dark:border-neutral-800 transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10"
                                    style={{ background: hex }}
                                />
                                <div className="w-48 relative h-12 overflow-hidden rounded-full shadow-sm border border-[var(--border-color)] ring-2 ring-white dark:ring-neutral-900">
                                    <input
                                        type="color"
                                        value={hex}
                                        onChange={e => handleHexChange(e.target.value)}
                                        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 m-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
