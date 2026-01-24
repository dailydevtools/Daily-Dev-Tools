"use client";

import { useState } from "react";
import { Copy, Check, Scissors } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function CssClipPathClient() {
    const t = useTranslations('CssClipPath');
    const [selectedShape, setSelectedShape] = useState("triangle");
    const [copied, setCopied] = useState(false);

    const shapes: Record<string, string> = {
        square: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
        circle: "circle(50% at 50% 50%)",
        ellipse: "ellipse(25% 40% at 50% 50%)",
        inset: "inset(10% 20% 30% 10%)",
        rhombus: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        hexagon: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        octagon: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        parallelogram: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
        trapezoid: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        message: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
        cross: "polygon(20% 0%, 80% 0%, 80% 20%, 100% 20%, 100% 80%, 80% 80%, 80% 100%, 20% 100%, 20% 80%, 0% 80%, 0% 20%, 20% 20%)",
        arrow: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
        frame: "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)"
    };

    const css = `clip-path: ${shapes[selectedShape]};
-webkit-clip-path: ${shapes[selectedShape]};`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">

                    <ToolPageHeader
                        title="CSS Clip-Path Generator"
                        description="Select a shape to generate the CSS clip-path property."
                        icon={<Scissors size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">

                        {/* Shape Selector */}
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6">
                            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{t('shapes')}</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {Object.keys(shapes).map(shape => (
                                    <button
                                        key={shape}
                                        onClick={() => setSelectedShape(shape)}
                                        className={`
                                            aspect-square rounded-lg flex items-center justify-center p-2 transition-all duration-200
                                            ${selectedShape === shape ? 'bg-[#fb923c] text-white' : 'bg-white/5 text-[#9ca3af] hover:bg-white/10 hover:text-white'}
                                        `}
                                        title={shape}
                                    >
                                        <div
                                            className="w-full h-full bg-current"
                                            style={{ clipPath: shapes[shape] }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Preview & Code */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 min-h-[400px] flex items-center justify-center bg-[#111] relative overflow-hidden">
                                <div className="absolute inset-0 z-0 opacity-20" style={{
                                    backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
                                    backgroundSize: "20px 20px"
                                }} />

                                <div
                                    className="w-[280px] h-[280px] bg-gradient-to-br from-orange-500 to-pink-600 relative z-10 shadow-2xl transition-all duration-500 ease-in-out"
                                    style={{ clipPath: shapes[selectedShape] }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-4xl">
                                        {t('preview')}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 overflow-hidden">
                                <div className="p-3 bg-white/5 border-b border-white/5 flex justify-between items-center px-5">
                                    <span className="text-[#9ca3af] text-sm">{t('cssCode')}</span>
                                    <button
                                        onClick={copyToClipboard}
                                        className="text-[#fb923c] hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
                                    >
                                        {copied ? <Check size={14} /> : <Copy size={14} />}
                                        {copied ? t('copied') : t('copy')}
                                    </button>
                                </div>
                                <div className="p-5 font-mono text-sm text-[#a5b4fc] whitespace-pre bg-black/20">
                                    {css}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
