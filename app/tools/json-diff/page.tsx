"use client";

import { useState } from "react";
import { GitCompare } from "lucide-react";
import Link from "next/link";

interface DiffLine {
    content: string;
    type: "same" | "added" | "removed";
    lineNumL?: number;
    lineNumR?: number;
}

export default function JsonDiff() {
    const [left, setLeft] = useState("");
    const [right, setRight] = useState("");
    const [diffs, setDiffs] = useState<DiffLine[]>([]);
    const [error, setError] = useState("");

    const compare = () => {
        setError("");
        try {
            if (!left.trim() || !right.trim()) return;

            // Format both
            const lObj = JSON.parse(left);
            const rObj = JSON.parse(right);
            const lStr = JSON.stringify(lObj, null, 2);
            const rStr = JSON.stringify(rObj, null, 2);

            const lLines = lStr.split('\n');
            const rLines = rStr.split('\n');

            const result: DiffLine[] = [];
            let i = 0, j = 0;

            // Very basic LCS-like or sequential line compare (Simplistic for MVP)
            // This is NOT a full diff algo, just a greedy comparison.
            // For a real diff, use 'diff' package.
            // Implementing simple greedy diff here:

            while (i < lLines.length || j < rLines.length) {
                const l = lLines[i];
                const r = rLines[j];

                if (l === r) {
                    result.push({ content: l, type: "same", lineNumL: i + 1, lineNumR: j + 1 });
                    i++;
                    j++;
                } else {
                    // If mismatch, try to find l in future r
                    // or r in future l
                    // This 'lookahead' is expensive/complex.
                    // Fallback: Show removed from L, then added to R if possible.
                    // Simple heuristic: if lines differ, mark removal then addition.

                    // Check if R has L later?
                    // For simplicity in client-side 'no-deps' env:
                    // If not match, push REMOVED L, then ADDED R?

                    if (i < lLines.length) {
                        result.push({ content: l, type: "removed", lineNumL: i + 1 });
                        i++;
                    }
                    if (j < rLines.length) {
                        result.push({ content: rLines[j], type: "added", lineNumR: j + 1 });
                        j++;
                    }

                    // Note: This logic is flawed for real diffs but gives basic indication.
                    // Better heuristic:
                    // If l != r, scan lookahead.
                }
            }

            // Better Line Diff Algo for 'Quick Tools' ->
            // To avoid bad diffs, just listing text diffs is okay?
            // Let's refine the loop slightly.

            setDiffs(result);

        } catch (e: any) {
            setError("Invalid JSON input: " + e.message);
        }
    };

    // Improved simple Diff algorithm (O(N^2) worst case but fine for typical 100 lines)
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
            setError("Invalid JSON: " + e.message);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                        <div className="glass-card" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', color: '#9ca3af', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Original JSON</div>
                            <textarea
                                value={left} onChange={e => setLeft(e.target.value)}
                                placeholder='{"a": 1}'
                                style={{ flex: 1, minHeight: 200, background: 'transparent', border: 'none', padding: 20, color: 'white', fontFamily: 'monospace', resize: 'vertical', outline: 'none' }}
                            />
                        </div>
                        <div className="glass-card" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', color: '#9ca3af', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>New JSON</div>
                            <textarea
                                value={right} onChange={e => setRight(e.target.value)}
                                placeholder='{"a": 2}'
                                style={{ flex: 1, minHeight: 200, background: 'transparent', border: 'none', padding: 20, color: 'white', fontFamily: 'monospace', resize: 'vertical', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <button onClick={computeDiff} className="btn-primary" style={{ padding: '12px 32px' }}>Compare JSON</button>
                    </div>

                    {error && <div style={{ textAlign: 'center', color: '#ef4444', marginBottom: 24 }}>{error}</div>}

                    {diffs.length > 0 && (
                        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', color: '#9ca3af', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                Diff Results
                            </div>
                            <div style={{ padding: 0, fontFamily: 'monospace', fontSize: 14, overflowX: 'auto' }}>
                                {diffs.map((d, i) => (
                                    <div key={i} style={{
                                        display: 'flex',
                                        background: d.type === 'added' ? 'rgba(34, 197, 94, 0.1)' : d.type === 'removed' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                                        borderLeft: `4px solid ${d.type === 'added' ? '#22c55e' : d.type === 'removed' ? '#ef4444' : 'transparent'}`,
                                        color: d.type === 'same' ? '#d1d5db' : 'white'
                                    }}>
                                        <div style={{ width: 40, textAlign: 'right', paddingRight: 12, color: '#6b7280', userSelect: 'none' }}>{d.lineNumL || ''}</div>
                                        <div style={{ width: 40, textAlign: 'right', paddingRight: 12, color: '#6b7280', userSelect: 'none' }}>{d.lineNumR || ''}</div>
                                        <div style={{ whiteSpace: 'pre-wrap', padding: '2px 0' }}>
                                            {d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ' '} {d.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
