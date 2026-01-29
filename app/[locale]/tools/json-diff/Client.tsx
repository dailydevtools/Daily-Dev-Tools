"use client";

import { useState } from "react";
import { GitCompare } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

interface DiffLine {
    content: string;
    type: "same" | "added" | "removed";
    lineNumL?: number;
    lineNumR?: number;
}

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

export default function JsonDiffClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [left, setLeft] = useState("");
    const [right, setRight] = useState("");
    const [diffs, setDiffs] = useState<DiffLine[]>([]);
    const [error, setError] = useState("");

    const computeDiff = () => {
        try {
            const lLines = JSON.stringify(JSON.parse(left), null, 2).split('\n');
            const rLines = JSON.stringify(JSON.parse(right), null, 2).split('\n');

            // LCS Matrix
            const n = lLines.length;
            const m = rLines.length;
            // Explicit type for dp
            const dp: number[][] = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0));

            for (let i = 1; i <= n; i++) {
                for (let j = 1; j <= m; j++) {
                    if (lLines[i - 1] === rLines[j - 1]) {
                        dp[i][j] = dp[i - 1][j - 1] + 1;
                    } else {
                        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                    }
                }
            }

            // Backtrack
            const res: DiffLine[] = [];
            let i = n, j = m;
            while (i > 0 || j > 0) {
                if (i > 0 && j > 0 && lLines[i - 1] === rLines[j - 1]) {
                    res.push({ content: lLines[i - 1], type: "same", lineNumL: i, lineNumR: j });
                    i--; j--;
                } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
                    res.push({ content: rLines[j - 1], type: "added", lineNumR: j });
                    j--;
                } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
                    res.push({ content: lLines[i - 1], type: "removed", lineNumL: i });
                    i--;
                }
            }
            setDiffs(res.reverse());
            setError("");
        } catch (e: any) {
            setError(t('common.error') + ": " + e.message);
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <ToolPageHeader
                        title={tTools('json-diff.name')}
                        description={tTools('json-diff.description')}
                        icon={<GitCompare size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all">
                            <div className="py-3 px-5 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5 text-[var(--muted-text)] text-xs font-medium uppercase tracking-wider">
                                {t('JsonDiff.original')}
                            </div>
                            <textarea
                                value={left} onChange={e => setLeft(e.target.value)}
                                placeholder='{"a": 1}'
                                className="flex-1 min-h-[300px] bg-transparent border-none p-5 text-[var(--foreground)] font-mono resize-y outline-none text-sm leading-relaxed"
                            />
                        </LiquidCard>

                        <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all">
                            <div className="py-3 px-5 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5 text-[var(--muted-text)] text-xs font-medium uppercase tracking-wider">
                                {t('JsonDiff.modified')}
                            </div>
                            <textarea
                                value={right} onChange={e => setRight(e.target.value)}
                                placeholder='{"a": 2}'
                                className="flex-1 min-h-[300px] bg-transparent border-none p-5 text-[var(--foreground)] font-mono resize-y outline-none text-sm leading-relaxed"
                            />
                        </LiquidCard>
                    </div>

                    <div className="text-center mb-8">
                        <LiquidButton onClick={computeDiff} className="px-12 py-4 text-base">
                            <GitCompare size={20} className="mr-2" />
                            {t('JsonDiff.compare')}
                        </LiquidButton>
                    </div>

                    {error && (
                        <div className="text-center text-red-500 mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                    {diffs.length > 0 && (
                        <LiquidCard className="p-0 overflow-hidden">
                            <div className="py-3 px-5 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5 text-[var(--muted-text)] text-xs font-medium uppercase tracking-wider">
                                {t('JsonDiff.differences')}
                            </div>
                            <div className="p-0 font-mono text-sm overflow-x-auto bg-white dark:bg-[#0a0a0a]">
                                {diffs.map((d, i) => (
                                    <div key={i} className={`
                                        flex hover:bg-black/5 dark:hover:bg-white/5 transition-colors
                                        ${d.type === 'added' ? 'bg-green-500/10 dark:bg-green-500/20 border-l-4 border-green-500' : ''}
                                        ${d.type === 'removed' ? 'bg-red-500/10 dark:bg-red-500/20 border-l-4 border-red-500' : ''}
                                        ${d.type === 'same' ? 'border-l-4 border-transparent text-[var(--muted-text)]' : 'text-[var(--foreground)]'}
                                    `}>
                                        <div className="w-12 text-right pr-4 text-[var(--muted-text)] select-none opacity-50 py-1 bg-neutral-50 dark:bg-white/5 border-r border-[var(--border-color)]">{d.lineNumL || ''}</div>
                                        <div className="w-12 text-right pr-4 text-[var(--muted-text)] select-none opacity-50 py-1 bg-neutral-50 dark:bg-white/5 border-r border-[var(--border-color)] mr-2">{d.lineNumR || ''}</div>
                                        <div className="whitespace-pre-wrap py-1 flex-1 px-2">
                                            <span className="inline-block w-4 opacity-50 select-none mr-2 font-bold">
                                                {d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ''}
                                            </span>
                                            {d.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </LiquidCard>
                    )}

                </div>
            </div>
        </main>
    );
}
