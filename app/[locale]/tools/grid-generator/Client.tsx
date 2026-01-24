"use client";

import { useState } from "react";
import { Copy, Check, Grid, Settings, Code } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function GridGeneratorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const [rowGap, setRowGap] = useState(16);
    const [colGap, setColGap] = useState(16);
    const [copied, setCopied] = useState(false);

    const cssCode = `.container {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  grid-column-gap: ${colGap}px;
  grid-row-gap: ${rowGap}px;
}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[900px] mx-auto">
                    <ToolPageHeader
                        title={tTools('grid-generator.name')}
                        description={tTools('grid-generator.description')}
                        icon={<Grid size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
                        {/* Controls */}
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6">
                            <div className="flex items-center gap-2.5 mb-5 text-white font-semibold">
                                <Settings size={18} className="text-orange-400" /> {t('GridGenerator.options')}
                            </div>

                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className="block text-[#9ca3af] text-[13px] mb-2">{t('GridGenerator.rows')} ({rows})</label>
                                    <input
                                        type="range" min="1" max="12" value={rows}
                                        onChange={(e) => setRows(Number(e.target.value))}
                                        className="w-full accent-[#fb923c]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#9ca3af] text-[13px] mb-2">{t('GridGenerator.columns')} ({cols})</label>
                                    <input
                                        type="range" min="1" max="12" value={cols}
                                        onChange={(e) => setCols(Number(e.target.value))}
                                        className="w-full accent-[#fb923c]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#9ca3af] text-[13px] mb-2">{t('GridGenerator.rowGap')} ({rowGap}px)</label>
                                    <input
                                        type="range" min="0" max="50" value={rowGap}
                                        onChange={(e) => setRowGap(Number(e.target.value))}
                                        className="w-full accent-[#fb923c]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#9ca3af] text-[13px] mb-2">{t('GridGenerator.colGap')} ({colGap}px)</label>
                                    <input
                                        type="range" min="0" max="50" value={colGap}
                                        onChange={(e) => setColGap(Number(e.target.value))}
                                        className="w-full accent-[#fb923c]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Preview & Code */}
                        <div className="flex flex-col gap-6">
                            {/* Visual Preview */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 min-h-[300px] flex items-center justify-center bg-[#0a0a0a]">
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                                    columnGap: colGap,
                                    rowGap: rowGap,
                                    width: "100%",
                                    height: "100%",
                                    minHeight: 250
                                }}>
                                    {Array.from({ length: rows * cols }).map((_, i) => (
                                        <div key={i} className="bg-orange-500/20 border border-dashed border-orange-500/40 rounded-md flex items-center justify-center text-[#fb923c] text-xs font-semibold">
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Code Block */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 overflow-hidden">
                                <div className="px-5 py-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                                        <Code size={16} className="text-orange-400" /> {t('GridGenerator.css')}
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className={`flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-xs transition-colors duration-200 ${copied ? "text-[#22c55e]" : "text-[#9ca3af]"}`}
                                    >
                                        {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : t('GridGenerator.copyCss')}
                                    </button>
                                </div>
                                <pre className="m-0 p-5 bg-[#111] text-[#a5b4fc] text-sm font-mono overflow-x-auto">
                                    {cssCode}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
