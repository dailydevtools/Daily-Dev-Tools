"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('direction')}</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].map(d => (
                                            <button
                                                key={d} onClick={() => setDirection(d)}
                                                className={`p-2 rounded-lg border text-xs transition-colors duration-200 ${direction === d ? 'border-[#fb923c] bg-orange-500/20 text-[#fb923c]' : 'border-white/10 bg-white/5 text-white'}`}
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('color')}</label>
                                    <div className="flex gap-3">
                                        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 p-0 border-none rounded-lg bg-transparent cursor-pointer" />
                                        <input type="text" value={color} onChange={e => setColor(e.target.value)} className="input-field flex-1 p-3 rounded-xl bg-black/30 border border-white/10 text-white" />
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="flex-1">
                                        <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('width')}</label>
                                        <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('height')}</label>
                                        <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 flex items-center justify-center bg-[#111] min-h-[200px]">
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
                            </div>

                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0">
                                <div className="p-3 bg-black/20 text-[#9ca3af] text-[13px] border-b border-white/10">{t('outputLabel')}</div>
                                <textarea readOnly value={css} className="w-full h-[120px] p-5 rounded-none bg-transparent border-none text-[#fb923c] font-mono resize-none outline-none" />
                                <div className="p-3 text-right border-t border-white/10">
                                    <button onClick={() => navigator.clipboard.writeText(css)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2 px-4 rounded-lg">{t('copy')}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
