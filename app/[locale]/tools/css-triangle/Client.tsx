"use client";

import { useState } from "react";
import { Play, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput, LiquidTextArea } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

export default function CssTriangleClient() {
    const t = useTranslations('CssTriangle');
    const [direction, setDirection] = useState("top");
    const [color, setColor] = useState("#fb923c");
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    const generate = () => {
        let css = `width: 0;
height: 0;
border-style: solid;`;

        if (direction === "top") {
            css += `\nborder-width: 0 ${width / 2}px ${height}px ${width / 2}px;
border-color: transparent transparent ${color} transparent;`;
        } else if (direction === "bottom") {
            css += `\nborder-width: ${height}px ${width / 2}px 0 ${width / 2}px;
border-color: ${color} transparent transparent transparent;`;
        } else if (direction === "left") {
            css += `\nborder-width: ${height / 2}px ${width}px ${height / 2}px 0;
border-color: transparent ${color} transparent transparent;`;
        } else if (direction === "right") {
            css += `\nborder-width: ${height / 2}px 0 ${height / 2}px ${width}px;
border-color: transparent transparent transparent ${color};`;
        } else if (direction === "top-left") {
            css += `\nborder-width: ${height}px ${width}px 0 0;
border-color: ${color} transparent transparent transparent;`;
        } else if (direction === "top-right") {
            css += `\nborder-width: 0 ${width}px ${height}px 0;
border-color: transparent ${color} transparent transparent;`;
        } else if (direction === "bottom-left") {
            css += `\nborder-width: ${height}px 0 0 ${width}px;
border-color: transparent transparent transparent ${color};`;
        } else if (direction === "bottom-right") {
            css += `\nborder-width: 0 0 ${height}px ${width}px;
border-color: transparent transparent ${color} transparent;`;
        }

        return css;
    };

    const css = generate();

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">

                    <ToolPageHeader
                        title="CSS Triangle Generator"
                        description="Create CSS triangles easily. Adjust direction, size, and color."
                        icon={<Play size={28} className="text-[#fb923c] rotate-[-90deg]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <LiquidCard className="p-10">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('direction')}</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].map(d => (
                                            <button
                                                key={d} onClick={() => setDirection(d)}
                                                className={`p-2 rounded-lg border text-xs font-medium transition-colors duration-200 ${direction === d ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--muted-text)] hover:bg-[var(--card-hover-bg)] hover:text-[var(--foreground)]'}`}
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('color')}</label>
                                    <div className="flex gap-3">
                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[var(--border-color)] shrink-0">
                                            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 border-none cursor-pointer" />
                                        </div>
                                        <LiquidInput value={color} onChange={e => setColor(e.target.value)} />
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="flex-1">
                                        <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('width')}</label>
                                        <LiquidInput type="number" value={width} onChange={e => setWidth(Number(e.target.value))} />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('height')}</label>
                                        <LiquidInput type="number" value={height} onChange={e => setHeight(Number(e.target.value))} />
                                    </div>
                                </div>
                            </div>
                        </LiquidCard>

                        <div className="flex flex-col gap-6">
                            <LiquidCard className="p-10 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 min-h-[200px]">
                                <div style={{
                                    width: 0, height: 0, borderStyle: 'solid',
                                    borderWidth: direction === 'top' ? `0 ${width / 2}px ${height}px ${width / 2}px` :
                                        direction === 'bottom' ? `${height}px ${width / 2}px 0 ${width / 2}px` :
                                            direction === 'left' ? `${height / 2}px ${width}px ${height / 2}px 0` :
                                                direction === 'right' ? `${height / 2}px 0 ${height / 2}px ${width}px` :
                                                    direction === 'top-left' ? `${height}px ${width}px 0 0` :
                                                        direction === 'top-right' ? `0 ${width}px ${height}px 0` :
                                                            direction === 'bottom-left' ? `${height}px 0 0 ${width}px` :
                                                                `0 0 ${height}px ${width}px`,
                                    borderColor: direction === 'top' ? `transparent transparent ${color} transparent` :
                                        direction === 'bottom' ? `${color} transparent transparent transparent` :
                                            direction === 'left' ? `transparent ${color} transparent transparent` :
                                                direction === 'right' ? `transparent transparent transparent ${color}` :
                                                    direction === 'top-left' ? `${color} transparent transparent transparent` :
                                                        direction === 'top-right' ? `transparent ${color} transparent transparent` :
                                                            direction === 'bottom-left' ? `transparent transparent transparent ${color}` :
                                                                `transparent transparent ${color} transparent`
                                }} />
                            </LiquidCard>

                            <LiquidCard className="p-0 flex flex-col">
                                <div className="p-4 px-6 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                    <span className="text-sm font-medium text-[var(--muted-text)]">CSS Output</span>
                                    <LiquidButton onClick={() => navigator.clipboard.writeText(css)} variant="ghost" className="h-8 py-0 px-3 text-xs gap-2">
                                        <Copy size={14} /> {t('copy')}
                                    </LiquidButton>
                                </div>
                                <LiquidTextArea
                                    readOnly
                                    value={css}
                                    className="h-[150px] border-none !bg-transparent text-orange-500 font-mono resize-none outline-none text-sm leading-relaxed"
                                />
                            </LiquidCard>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
