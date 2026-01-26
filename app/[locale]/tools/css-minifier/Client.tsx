"use client";

import { useState } from "react";
import { Copy, Check, Trash2 } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

export default function CssMinifierClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState({ original: 0, minified: 0, savings: 0 });

    const minifyCss = () => {
        if (!input) return;

        let minified = input
            .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
            .replace(/\s+/g, " ")             // Compress whitespace
            .replace(/\s*([{}:;,])\s*/g, "$1") // Remove space around separators
            .replace(/;}/g, "}")              // Remove last semicolon
            .trim();

        setOutput(minified);

        const originalSize = new Blob([input]).size;
        const minifiedSize = new Blob([minified]).size;
        const savings = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize * 100).toFixed(1) : 0;

        setStats({
            original: originalSize,
            minified: minifiedSize,
            savings: Number(savings)
        });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
        setStats({ original: 0, minified: 0, savings: 0 });
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title={tTools('css-minifier.name')}
                        description={tTools('css-minifier.description')}
                        icon={<ToolIcon name="FileCode" size={32} />}
                    />

                    <div className="flex items-center gap-3 mb-6">
                        <button onClick={minifyCss} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-2.5 px-6">
                            {t('common.minify')} CSS
                        </button>
                        <button onClick={clearAll} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2.5 px-6 text-[#ef4444] border-red-500/30 flex items-center gap-2">
                            <Trash2 size={16} /> {t('common.clear')}
                        </button>
                        {stats.savings > 0 && (
                            <div className="ml-auto flex gap-4 text-[13px]">
                                <span className="text-[#9ca3af]">Original: <b className="text-white">{stats.original} B</b></span>
                                <span className="text-[#9ca3af]">Minified: <b className="text-[#4ade80]">{stats.minified} B</b></span>
                                <span className="text-[#fb923c] font-bold">Saved {stats.savings}%</span>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden flex flex-col">
                            <div className="flex justify-between py-3 px-5 border-b border-white/5">
                                <span className="text-sm font-medium text-[#9ca3af]">{t('common.input')} CSS</span>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t('CssMinifier.inputPlaceholder')}
                                className="flex-1 h-[400px] bg-transparent border-none p-5 font-mono text-[13px] text-[#e5e7eb] resize-none outline-none"
                            />
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden flex flex-col">
                            <div className="flex justify-between items-center py-3 px-5 border-b border-white/5">
                                <span className="text-sm font-medium text-[#fb923c]">{t('common.output')}</span>
                                <button onClick={copyToClipboard} className={`bg-transparent border-none cursor-pointer ${copied ? 'text-[#22c55e]' : 'text-[#9ca3af]'}`}>
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                            <textarea
                                value={output}
                                readOnly
                                placeholder={t('CssMinifier.outputPlaceholder')}
                                className="flex-1 h-[400px] bg-transparent border-none p-5 font-mono text-[13px] text-[#4ade80] resize-none outline-none"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
