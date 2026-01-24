"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
                        icon={<span className="text-2xl font-bold">↔️</span>}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-4 rounded-2xl flex flex-col">
                            <label className="text-[#fb923c] font-semibold mb-2 text-sm">{t('original')}</label>
                            <textarea
                                value={oldText}
                                onChange={(e) => { setOldText(e.target.value); computeDiff(); }}
                                className="flex-1 min-h-[200px] bg-black/20 border-none resize-none outline-none text-[13px] text-[#e5e7eb] font-mono p-3 rounded-lg"
                            />
                        </div>
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-4 rounded-2xl flex flex-col">
                            <label className="text-[#facc15] font-semibold mb-2 text-sm">{t('changed')}</label>
                            <textarea
                                value={newText}
                                onChange={(e) => { setNewText(e.target.value); computeDiff(); }}
                                className="flex-1 min-h-[200px] bg-black/20 border-none resize-none outline-none text-[13px] text-[#e5e7eb] font-mono p-3 rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center mb-6">
                        <button onClick={computeDiff} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-2.5 px-8 flex items-center gap-2">
                            <RefreshCw size={16} /> {t('update')}
                        </button>
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden">
                        <div className="bg-black/40 py-2 px-4 grid grid-cols-[50px_50px_1fr] gap-4 border-b border-white/5">
                            <div className="text-[#9ca3af] text-xs text-right">{t('old')}</div>
                            <div className="text-[#9ca3af] text-xs text-right">{t('new')}</div>
                            <div className="text-[#9ca3af] text-xs">{t('content')}</div>
                        </div>
                        <div className="font-mono text-[13px]">
                            {diff.map((line, i) => (
                                <div
                                    key={i}
                                    className={`grid grid-cols-[50px_50px_1fr] gap-4 py-1 px-4 ${line.type === 'added' ? 'bg-[#22c55e]/10' : line.type === 'removed' ? 'bg-[#ef4444]/10' : 'bg-transparent'}`}
                                >
                                    <div className="text-[#6b7280] text-right">{line.lineOld || ''}</div>
                                    <div className="text-[#6b7280] text-right">{line.lineNew || ''}</div>
                                    <div className={`whitespace-pre-wrap break-all ${line.type === 'same' ? 'text-[#d1d5db]' : line.type === 'added' ? 'text-[#86efac]' : 'text-[#fca5a5]'}`}>
                                        {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}
                                        {line.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
