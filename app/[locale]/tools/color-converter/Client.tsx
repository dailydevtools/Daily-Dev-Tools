"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 grid grid-cols-1 md:grid-cols-[minmax(300px,1fr)_200px] gap-10">

                        <div className="flex flex-col gap-6">
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">HEX</label>
                                <div className="flex gap-3">
                                    <div
                                        className="w-10 h-10 rounded-lg border border-white/20"
                                        style={{ background: hex }}
                                    />
                                    <input
                                        type="text" value={hex} onChange={e => handleHexChange(e.target.value)}
                                        className="input-field flex-1 p-3 rounded-lg bg-black/30 border border-white/10 text-white font-mono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">RGB</label>
                                <div className="relative">
                                    <input
                                        type="text" value={rgb} readOnly
                                        className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-[#9ca3af] font-mono"
                                    />
                                    <button onClick={() => navigator.clipboard.writeText(`rgb(${rgb})`)} className="absolute right-2 top-2 py-1 px-2 rounded bg-white/10 border-none text-white cursor-pointer text-xs">{t('ColorConverter.copy')}</button>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">HSL</label>
                                <div className="relative">
                                    <input
                                        type="text" value={hsl} readOnly
                                        className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-[#9ca3af] font-mono"
                                    />
                                    <button onClick={() => navigator.clipboard.writeText(`hsl(${hsl})`)} className="absolute right-2 top-2 py-1 px-2 rounded bg-white/10 border-none text-white cursor-pointer text-xs">{t('ColorConverter.copy')}</button>
                                </div>
                            </div>
                            <div className="text-xs text-[#6b7280]">{t('ColorConverter.hexToRgbNote')}</div>
                        </div>

                        <div className="flex flex-col gap-4 items-center justify-center">
                            <div
                                className="w-[140px] h-[140px] rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5),_inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                                style={{ background: hex }}
                            />
                            <input type="color" value={hex} onChange={e => handleHexChange(e.target.value)} className="w-full cursor-pointer h-10" />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
