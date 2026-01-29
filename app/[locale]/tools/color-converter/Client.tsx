"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";

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

                    <LiquidCard className="p-10 grid grid-cols-1 md:grid-cols-[minmax(300px,1fr)_200px] gap-10">

                        <div className="flex flex-col gap-6">
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">HEX</label>
                                <div className="flex gap-3">
                                    <div
                                        className="w-12 h-12 rounded-xl border border-[var(--border-color)] shadow-sm"
                                        style={{ background: hex }}
                                    />
                                    <LiquidInput
                                        type="text" value={hex} onChange={e => handleHexChange(e.target.value)}
                                        className="flex-1 font-mono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">RGB</label>
                                <div className="relative group">
                                    <LiquidInput
                                        type="text" value={rgb} readOnly
                                        className="w-full font-mono text-[var(--muted-text)]"
                                    />
                                    <button
                                        onClick={() => navigator.clipboard.writeText(`rgb(${rgb})`)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 py-1.5 px-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-[var(--muted-text)] hover:text-orange-500 text-xs font-medium transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        {t('ColorConverter.copy')}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">HSL</label>
                                <div className="relative group">
                                    <LiquidInput
                                        type="text" value={hsl} readOnly
                                        className="w-full font-mono text-[var(--muted-text)]"
                                    />
                                    <button
                                        onClick={() => navigator.clipboard.writeText(`hsl(${hsl})`)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 py-1.5 px-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-[var(--muted-text)] hover:text-orange-500 text-xs font-medium transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        {t('ColorConverter.copy')}
                                    </button>
                                </div>
                            </div>
                            <div className="text-xs text-[var(--muted-text)] opacity-60">{t('ColorConverter.hexToRgbNote')}</div>
                        </div>

                        <div className="flex flex-col gap-6 items-center justify-center">
                            <div
                                className="w-[180px] h-[180px] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1),_inset_0_0_0_1px_rgba(255,255,255,0.1)] border-4 border-white dark:border-neutral-800 transition-all duration-300"
                                style={{ background: hex }}
                            />
                            <div className="w-full relative h-10 overflow-hidden rounded-xl border border-[var(--border-color)]">
                                <input
                                    type="color"
                                    value={hex}
                                    onChange={e => handleHexChange(e.target.value)}
                                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 m-0"
                                />
                            </div>
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
