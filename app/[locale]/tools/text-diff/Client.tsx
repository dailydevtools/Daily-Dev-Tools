"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import CodeEditor from "../../../components/CodeEditor";

export default function TextDiffClient() {
    const t = useTranslations('TextDiff');
    const [oldText, setOldText] = useState('{\n  "name": "example",\n  "version": "1.0.0"\n}');
    const [newText, setNewText] = useState('{\n  "name": "example-app",\n  "version": "1.0.1",\n  "private": true\n}');
    const [diff, setDiff] = useState<any[]>([]);

    const computeDiff = () => {
        const oldLines = oldText.split('\n');
        const newLines = newText.split('\n');

        const matrix: number[][] = [];
        for (let i = 0; i <= oldLines.length; i++) {
            matrix[i] = new Array(newLines.length + 1).fill(0);
        }

        for (let i = 1; i <= oldLines.length; i++) {
            for (let j = 1; j <= newLines.length; j++) {
                if (oldLines[i - 1] === newLines[j - 1]) {
                    matrix[i][j] = matrix[i - 1][j - 1] + 1;
                } else {
                    matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
                }
            }
        }

        const result = [];
        let i = oldLines.length;
        let j = newLines.length;

        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
                result.unshift({ type: 'same', content: oldLines[i - 1], lineOld: i, lineNew: j });
                i--; j--;
            } else if (j > 0 && (i === 0 || matrix[i][j - 1] >= matrix[i - 1][j])) {
                result.unshift({ type: 'added', content: newLines[j - 1], lineNew: j });
                j--;
            } else if (i > 0 && (j === 0 || matrix[i][j - 1] < matrix[i - 1][j])) {
                result.unshift({ type: 'removed', content: oldLines[i - 1], lineOld: i });
                i--;
            }
        }

        setDiff(result);
    };

    useState(() => {
        computeDiff();
    });

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <ToolPageHeader
                        title="Text Diff Checker"
                        description="Compare text and code to find differences (additions/removals) instantly."
                        icon={<ToolIcon name="GitCompare" size={32} />}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <LiquidCard className="p-5 flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all h-[400px]">
                            <label className="text-[#fb923c] font-semibold mb-3 text-xs uppercase tracking-wider">{t('original')}</label>
                            <div className="flex-1 min-h-[300px] relative w-full h-full">
                                <CodeEditor
                                    language="plaintext"
                                    value={oldText}
                                    onChange={(val) => { setOldText(val || ""); computeDiff(); }}
                                    className="rounded-xl h-full"
                                />
                            </div>
                        </LiquidCard>
                        <LiquidCard className="p-5 flex flex-col group focus-within:ring-2 ring-yellow-500/20 transition-all h-[400px]">
                            <label className="text-yellow-600 dark:text-[#facc15] font-semibold mb-3 text-xs uppercase tracking-wider">{t('changed')}</label>
                            <div className="flex-1 min-h-[300px] relative w-full h-full">
                                <CodeEditor
                                    language="plaintext"
                                    value={newText}
                                    onChange={(val) => { setNewText(val || ""); computeDiff(); }}
                                    className="rounded-xl h-full"
                                />
                            </div>
                        </LiquidCard>
                    </div>

                    <div className="flex justify-center mb-10">
                        <button onClick={computeDiff} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-8 py-3 rounded-xl border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] active:scale-95 group">
                            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" /> {t('update')}
                        </button>
                    </div>

                    <LiquidCard className="p-0 overflow-hidden">
                        <div className="bg-neutral-100/80 dark:bg-white/5 py-3 px-6 grid grid-cols-[60px_60px_1fr] gap-4 border-b border-[var(--border-color)] backdrop-blur-md sticky top-0 z-10">
                            <div className="text-[var(--muted-text)] text-[11px] font-bold uppercase tracking-widest text-right">{t('old')}</div>
                            <div className="text-[var(--muted-text)] text-[11px] font-bold uppercase tracking-widest text-right">{t('new')}</div>
                            <div className="text-[var(--muted-text)] text-[11px] font-bold uppercase tracking-widest">{t('content')}</div>
                        </div>
                        <div className="font-mono text-[13px] divide-y divide-[var(--border-color)]/50">
                            {diff.map((line, i) => (
                                <div
                                    key={i}
                                    className={`grid grid-cols-[60px_60px_1fr] gap-4 py-1.5 px-6 transition-colors ${line.type === 'added' ? 'bg-green-500/10' : line.type === 'removed' ? 'bg-red-500/10' : 'hover:bg-neutral-500/5'}`}
                                >
                                    <div className="text-[var(--muted-text)] text-right opacity-50 select-none text-xs flex items-center justify-end">{line.lineOld || ''}</div>
                                    <div className="text-[var(--muted-text)] text-right opacity-50 select-none text-xs flex items-center justify-end">{line.lineNew || ''}</div>
                                    <div className={`whitespace-pre-wrap break-all py-0.5 leading-relaxed ${line.type === 'same' ? 'text-[var(--foreground)]' : line.type === 'added' ? 'text-green-600 dark:text-green-400 font-medium' : 'text-red-600 dark:text-red-400 font-medium'}`}>
                                        <span className={`inline-block w-4 select-none opacity-50`}>
                                            {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                                        </span>
                                        {line.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
