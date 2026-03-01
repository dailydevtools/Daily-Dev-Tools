"use client";

import { useState } from "react";
import { Copy, Check, Trash2 } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import CodeEditor from "../../../components/CodeEditor";

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
                        <LiquidCard className="p-0 overflow-hidden flex flex-col h-[450px] group focus-within:ring-2 ring-orange-500/20 transition-all">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5 opacity-60">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('common.input')} CSS</span>
                                </div>
                                <span className="text-xs text-[var(--muted-text)] font-mono">{input.length} chars</span>
                            </div>
                            <div className="flex-1 w-full bg-transparent relative">
                                <CodeEditor
                                    language="css"
                                    value={input}
                                    onChange={(val) => setInput(val || "")}
                                    className="border-none !bg-transparent rounded-none rounded-b-xl"
                                    options={{
                                        wordWrap: "on",
                                        padding: { top: 16, bottom: 16 }
                                    }}
                                />
                            </div>
                        </LiquidCard>

                        <LiquidCard className="p-0 overflow-hidden flex flex-col h-[450px] group focus-within:ring-2 ring-green-500/20 transition-all relative">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('common.output')}</span>
                                {output && (
                                    <button
                                        onClick={copyToClipboard}
                                        className={`p-1.5 rounded-lg transition-colors bg-transparent border-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 ${copied ? 'text-green-500' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                                        title={t('common.copy')}
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                )}
                            </div>
                            <div className="flex-1 w-full bg-transparent relative">
                                <CodeEditor
                                    language="css"
                                    value={output}
                                    options={{
                                        readOnly: true,
                                        wordWrap: "on",
                                        padding: { top: 16, bottom: 16 }
                                    }}
                                    className="border-none !bg-transparent rounded-none rounded-b-xl"
                                />
                            </div>
                        </LiquidCard>
                    </div>

                </div>
            </div>
        </main>
    );
}
