"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, FileDiff } from "lucide-react";
import Link from "next/link";

export default function TextDiff() {
    const [oldText, setOldText] = useState('{\n  "name": "example",\n  "version": "1.0.0"\n}');
    const [newText, setNewText] = useState('{\n  "name": "example-app",\n  "version": "1.0.1",\n  "private": true\n}');
    const [diff, setDiff] = useState<any[]>([]);

    // Simple Line Diff Algorithm
    const computeDiff = () => {
        const oldLines = oldText.split('\n');
        const newLines = newText.split('\n');

        // This is a naive line-by-line comparison for simplicity
        // A robust Myers diff algorithm would be better but explicit implementation is large.
        // We will use a "LCS" approach to align lines.

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

    // Run on mount/change
    useState(() => {
        computeDiff();
    });

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>↔️</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>Text Diff Checker</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Compare two blocks of text to find differences</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                        <div className="glass-card" style={{ padding: 16, borderRadius: 16, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ color: '#fb923c', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Original Text</label>
                            <textarea
                                value={oldText}
                                onChange={(e) => { setOldText(e.target.value); computeDiff(); }}
                                style={{ flex: 1, minHeight: 200, background: 'rgba(0,0,0,0.2)', border: 'none', resize: 'none', outline: 'none', fontSize: 13, color: '#e5e7eb', fontFamily: 'monospace', padding: 12, borderRadius: 8 }}
                            />
                        </div>
                        <div className="glass-card" style={{ padding: 16, borderRadius: 16, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ color: '#facc15', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Changed Text</label>
                            <textarea
                                value={newText}
                                onChange={(e) => { setNewText(e.target.value); computeDiff(); }}
                                style={{ flex: 1, minHeight: 200, background: 'rgba(0,0,0,0.2)', border: 'none', resize: 'none', outline: 'none', fontSize: 13, color: '#e5e7eb', fontFamily: 'monospace', padding: 12, borderRadius: 8 }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                        <button onClick={computeDiff} className="btn-primary" style={{ padding: '10px 32px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <RefreshCw style={{ width: 16, height: 16 }} /> Update Diff
                        </button>
                    </div>

                    <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '8px 16px', display: 'grid', gridTemplateColumns: '50px 50px 1fr', gap: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ color: '#9ca3af', fontSize: 12, textAlign: 'right' }}>Old</div>
                            <div style={{ color: '#9ca3af', fontSize: 12, textAlign: 'right' }}>New</div>
                            <div style={{ color: '#9ca3af', fontSize: 12 }}>Content</div>
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: 13 }}>
                            {diff.map((line, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '50px 50px 1fr',
                                        gap: 16,
                                        padding: '4px 16px',
                                        background: line.type === 'added' ? 'rgba(34, 197, 94, 0.1)' : line.type === 'removed' ? 'rgba(239, 68, 68, 0.1)' : 'transparent'
                                    }}
                                >
                                    <div style={{ color: '#6b7280', textAlign: 'right' }}>{line.lineOld || ''}</div>
                                    <div style={{ color: '#6b7280', textAlign: 'right' }}>{line.lineNew || ''}</div>
                                    <div style={{
                                        color: line.type === 'same' ? '#d1d5db' : line.type === 'added' ? '#86efac' : '#fca5a5',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-all'
                                    }}>
                                        {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}
                                        {line.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
