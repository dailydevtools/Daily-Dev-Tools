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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 flex flex-col">
                            <div className="p-3 bg-black/20 text-[#9ca3af] text-[13px] border-b border-white/10">{t('JsonDiff.original')}</div>
                            <textarea
                                value={left} onChange={e => setLeft(e.target.value)}
                                placeholder='{"a": 1}'
                                className="flex-1 min-h-[200px] bg-transparent border-none p-5 text-white font-mono resize-y outline-none"
                            />
                        </div>
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 flex flex-col">
                            <div className="p-3 bg-black/20 text-[#9ca3af] text-[13px] border-b border-white/10">{t('JsonDiff.modified')}</div>
                            <textarea
                                value={right} onChange={e => setRight(e.target.value)}
                                placeholder='{"a": 2}'
                                className="flex-1 min-h-[200px] bg-transparent border-none p-5 text-white font-mono resize-y outline-none"
                            />
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <button onClick={computeDiff} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-8">{t('JsonDiff.compare')}</button>
                    </div>

                    {error && <div className="text-center text-[#ef4444] mb-6">{error}</div>}

                    {diffs.length > 0 && (
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 overflow-hidden">
                            <div className="p-3 bg-black/20 text-[#9ca3af] text-[13px] border-b border-white/10">
                                {t('JsonDiff.differences')}
                            </div>
                            <div className="p-0 font-mono text-sm overflow-x-auto">
                                {diffs.map((d, i) => (
                                    <div key={i} className={`
                                        flex
                                        ${d.type === 'added' ? 'bg-green-500/10 border-l-4 border-[#22c55e]' : ''}
                                        ${d.type === 'removed' ? 'bg-red-500/10 border-l-4 border-[#ef4444]' : ''}
                                        ${d.type === 'same' ? 'bg-transparent border-l-4 border-transparent text-[#d1d5db]' : 'text-white'}
                                    `}>
                                        <div className="w-10 text-right pr-3 text-[#6b7280] select-none">{d.lineNumL || ''}</div>
                                        <div className="w-10 text-right pr-3 text-[#6b7280] select-none">{d.lineNumR || ''}</div>
                                        <div className="whitespace-pre-wrap py-0.5">
                                            {d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ' '} {d.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
