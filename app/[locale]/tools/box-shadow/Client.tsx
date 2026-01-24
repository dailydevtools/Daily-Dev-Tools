"use client";

import { useState } from "react";
import { Copy, Layers } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function BoxShadowGeneratorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [x, setX] = useState(0);
    const [y, setY] = useState(10);
    const [blur, setBlur] = useState(20);
    const [spread, setSpread] = useState(-5);
    const [color, setColor] = useState("#000000");
    const [opacity, setOpacity] = useState(0.3);
    const [inset, setInset] = useState(false);

    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const shadow = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
    const css = `box-shadow: ${shadow};`;

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">

                    <ToolPageHeader
                        title={tTools('box-shadow.name')}
                        description={tTools('box-shadow.description')}
                        icon={<Layers size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 items-start">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">

                            <div className="mb-5">
                                <label className="flex justify-between mb-2 text-[13px] text-[#9ca3af]">
                                    <span>{t('BoxShadowGenerator.horizontal')}</span> <span>{x}px</span>
                                </label>
                                <input type="range" min="-100" max="100" value={x} onChange={e => setX(Number(e.target.value))} className="w-full" />
                            </div>
                            <div className="mb-5">
                                <label className="flex justify-between mb-2 text-[13px] text-[#9ca3af]">
                                    <span>{t('BoxShadowGenerator.vertical')}</span> <span>{y}px</span>
                                </label>
                                <input type="range" min="-100" max="100" value={y} onChange={e => setY(Number(e.target.value))} className="w-full" />
                            </div>
                            <div className="mb-5">
                                <label className="flex justify-between mb-2 text-[13px] text-[#9ca3af]">
                                    <span>{t('BoxShadowGenerator.blur')}</span> <span>{blur}px</span>
                                </label>
                                <input type="range" min="0" max="100" value={blur} onChange={e => setBlur(Number(e.target.value))} className="w-full" />
                            </div>
                            <div className="mb-5">
                                <label className="flex justify-between mb-2 text-[13px] text-[#9ca3af]">
                                    <span>{t('BoxShadowGenerator.spread')}</span> <span>{spread}px</span>
                                </label>
                                <input type="range" min="-100" max="100" value={spread} onChange={e => setSpread(Number(e.target.value))} className="w-full" />
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('BoxShadowGenerator.colorOpacity')}</label>
                                <div className="flex gap-3">
                                    <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 rounded-lg border-none p-0 bg-transparent" />
                                    <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={e => setOpacity(Number(e.target.value))} className="flex-1" />
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="flex items-center gap-2 cursor-pointer text-white">
                                    <input type="checkbox" checked={inset} onChange={e => setInset(e.target.checked)} className="w-4 h-4" />
                                    {t('BoxShadowGenerator.inset')}
                                </label>
                            </div>

                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="h-[400px] bg-white rounded-2xl flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[image:linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] opacity-10 pointer-events-none" />

                                <div
                                    className="w-[200px] h-[200px] bg-[#fb923c] rounded-xl"
                                    style={{ boxShadow: shadow }}
                                />
                            </div>

                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 flex items-center justify-between font-mono text-sm">
                                <code>{css}</code>
                                <button onClick={() => navigator.clipboard.writeText(css)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2 px-4 text-xs flex gap-2 items-center">
                                    <Copy size={16} /> {t('common.copy')}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
