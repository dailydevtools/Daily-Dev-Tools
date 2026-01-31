"use client";

import { useState } from "react";
import { Copy, Check, Grid, Settings, Code } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidSlider } from "../../../components/ui/LiquidSlider";

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
                        <LiquidCard className="p-6">
                            <div className="flex items-center gap-2.5 mb-5 text-[var(--foreground)] font-semibold">
                                <Settings size={18} className="text-orange-400" /> {t('GridGenerator.options')}
                            </div>

                            <div className="flex flex-col gap-0">
                                <LiquidSlider
                                    label={t('GridGenerator.rows')}
                                    valueDisplay={`${rows}`}
                                    min={1} max={12} step={1}
                                    value={rows}
                                    onChange={(e) => setRows(Number(e.target.value))}
                                    containerClassName="mb-6"
                                />
                                <LiquidSlider
                                    label={t('GridGenerator.columns')}
                                    valueDisplay={`${cols}`}
                                    min={1} max={12} step={1}
                                    value={cols}
                                    onChange={(e) => setCols(Number(e.target.value))}
                                    containerClassName="mb-6"
                                />
                                <LiquidSlider
                                    label={t('GridGenerator.rowGap')}
                                    valueDisplay={`${rowGap}px`}
                                    min={0} max={50} step={1}
                                    value={rowGap}
                                    onChange={(e) => setRowGap(Number(e.target.value))}
                                    containerClassName="mb-6"
                                />
                                <LiquidSlider
                                    label={t('GridGenerator.colGap')}
                                    valueDisplay={`${colGap}px`}
                                    min={0} max={50} step={1}
                                    value={colGap}
                                    onChange={(e) => setColGap(Number(e.target.value))}
                                    containerClassName="mb-0"
                                />
                            </div>
                        </LiquidCard>

                        {/* Preview & Code */}
                        <div className="flex flex-col gap-6">
                            {/* Visual Preview */}
                            <LiquidCard className="p-6 min-h-[300px] flex items-center justify-center bg-neutral-50 dark:bg-[#0a0a0a]">
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
                                        <div key={i} className="bg-orange-500/10 border border-dashed border-orange-500/40 rounded-lg flex items-center justify-center text-orange-500 text-xs font-semibold animate-in fade-in zoom-in duration-300">
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </LiquidCard>

                            {/* Code Block */}
                            <LiquidCard className="p-0 overflow-hidden">
                                <div className="px-5 py-3 border-b border-[var(--border-color)] flex justify-between items-center bg-neutral-50/50 dark:bg-white/5">
                                    <div className="flex items-center gap-2 text-[var(--foreground)] text-sm font-medium">
                                        <Code size={16} className="text-orange-400" /> Generated CSS
                                    </div>
                                    <LiquidButton
                                        variant="ghost"
                                        onClick={handleCopy}
                                        className="h-auto py-1 px-2 text-xs gap-1.5"
                                    >
                                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                        {copied ? "Copied!" : "Copy CSS"}
                                    </LiquidButton>
                                </div>
                                <pre className="m-0 p-5 bg-neutral-100 dark:bg-[#111] text-indigo-600 dark:text-indigo-300 text-sm font-mono overflow-x-auto">
                                    {cssCode}
                                </pre>
                            </LiquidCard>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
