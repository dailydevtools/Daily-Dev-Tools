"use client";

import { useState } from "react";
import { Copy, Layers } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidSlider } from "../../../components/ui/LiquidSlider";

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
                        {/* Controls Panel - Liquid Glass Card */}
                        <LiquidCard className="p-8">

                            <LiquidSlider
                                label={t('BoxShadowGenerator.horizontal')}
                                valueDisplay={`${x}px`}
                                min={-100} max={100}
                                value={x}
                                onChange={(e) => setX(Number(e.target.value))}
                                containerClassName="mb-6"
                            />

                            <LiquidSlider
                                label={t('BoxShadowGenerator.vertical')}
                                valueDisplay={`${y}px`}
                                min={-100} max={100}
                                value={y}
                                onChange={(e) => setY(Number(e.target.value))}
                                containerClassName="mb-6"
                            />

                            <LiquidSlider
                                label={t('BoxShadowGenerator.blur')}
                                valueDisplay={`${blur}px`}
                                min={0} max={100}
                                value={blur}
                                onChange={(e) => setBlur(Number(e.target.value))}
                                containerClassName="mb-6"
                            />

                            <LiquidSlider
                                label={t('BoxShadowGenerator.spread')}
                                valueDisplay={`${spread}px`}
                                min={-100} max={100}
                                value={spread}
                                onChange={(e) => setSpread(Number(e.target.value))}
                                containerClassName="mb-6"
                            />

                            <div className="mb-6">
                                <label className="block mb-2 text-[var(--muted-text)] text-[13px] font-medium">{t('BoxShadowGenerator.colorOpacity')}</label>
                                <div className="flex gap-3 items-end">
                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-[var(--border-color)] shrink-0 bg-[var(--card-bg)]">
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={e => setColor(e.target.value)}
                                            className="absolute -top-2 -left-2 w-[200%] h-[200%] p-0 m-0 cursor-pointer"
                                        />
                                    </div>
                                    <LiquidSlider
                                        min={0} max={1} step={0.01}
                                        value={opacity}
                                        onChange={(e) => setOpacity(Number(e.target.value))}
                                        containerClassName="flex-1"
                                        valueDisplay={opacity}
                                    />
                                </div>
                            </div>

                            <div className="mb-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${inset ? 'bg-orange-400 border-orange-400' : 'bg-transparent border-[var(--border-color)] group-hover:border-orange-400'}`}>
                                        {inset && <div className="w-2.5 h-1.5 border-b-2 border-l-2 border-white -rotate-45 mb-0.5"></div>}
                                    </div>
                                    <input type="checkbox" checked={inset} onChange={e => setInset(e.target.checked)} className="hidden" />
                                    <span className="text-[var(--title-color)] text-sm font-medium">{t('BoxShadowGenerator.inset')}</span>
                                </label>
                            </div>

                        </LiquidCard>

                        <div className="flex flex-col gap-6">
                            {/* Preview Stage */}
                            <div className="h-[400px] bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[24px] flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_0_1px_var(--glass-highlight)]">
                                <div className="absolute inset-0 bg-[image:linear-gradient(45deg,#8882_25%,transparent_25%),linear-gradient(-45deg,#8882_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#8882_75%),linear-gradient(-45deg,transparent_75%,#8882_75%)] bg-[length:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0px] opacity-10 pointer-events-none" />

                                <div
                                    className="w-[180px] h-[180px] bg-[#fb923c] rounded-2xl transition-all duration-300"
                                    style={{ boxShadow: shadow }}
                                />
                            </div>

                            {/* Code Snippet - Liquid Glass Input */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] p-6 flex items-center justify-between shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),inset_0_0_0_1px_var(--glass-highlight)]">
                                <code className="font-mono text-sm text-[var(--title-color)] opacity-90">{css}</code>
                                <LiquidButton
                                    onClick={() => navigator.clipboard.writeText(css)}
                                    variant="secondary"
                                    className="h-10 px-4 text-xs gap-2"
                                >
                                    <Copy size={14} />
                                    {t('common.copy')}
                                </LiquidButton>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
