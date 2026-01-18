"use client";

import { useState } from "react";
import { Search, BarChart } from "lucide-react";
import Link from "next/link";

interface KeywordStat {
    word: string;
    count: number;
    density: string;
}

export default function KeywordDensity() {
    const [input, setInput] = useState("");
    const [stats, setStats] = useState<KeywordStat[]>([]);

    const analyze = () => {
        if (!input.trim()) return;

        // Normalize: lowercase, remove special chars (keep alphanumeric and spaces)
        const text = input.toLowerCase().replace(/[^\w\s]/g, '');
        const words = text.split(/\s+/).filter(w => w.length > 2); // Filter short words
        const total = words.length;

        const counts: Record<string, number> = {};
        words.forEach(w => {
            counts[w] = (counts[w] || 0) + 1;
        });

        const sorted = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 50) // Top 50
            .map(([word, count]) => ({
                word,
                count,
                density: ((count / total) * 100).toFixed(2) + '%'
            }));

        setStats(sorted);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: 24 }}>
                        <div className="glass-card" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', color: '#9ca3af', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                Paste Content (Article, Blog Post, etc.)
                            </div>
                            <textarea
                                value={input} onChange={e => setInput(e.target.value)}
                                placeholder="Paste your text here to analyze keyword frequency..."
                                style={{ width: '100%', height: 400, background: 'transparent', border: 'none', padding: 20, color: 'white', fontSize: 14, resize: 'none', outline: 'none' }}
                            />
                            <div style={{ padding: 16, textAlign: 'right', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <button onClick={analyze} className="btn-primary" style={{ padding: '10px 24px' }}>Analyze Keywords</button>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: 460 }}>
                            <div style={{ padding: 16, background: 'rgba(0,0,0,0.2)', color: 'white', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <BarChart size={18} color="#fb923c" /> Top Keywords
                            </div>
                            <div style={{ overflowY: 'auto', flex: 1 }}>
                                {stats.length > 0 ? (
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                                        <thead style={{ background: 'rgba(255,255,255,0.02)', color: '#9ca3af', textAlign: 'left', position: 'sticky', top: 0 }}>
                                            <tr>
                                                <th style={{ padding: '12px 16px' }}>Keyword</th>
                                                <th style={{ padding: '12px 16px' }}>Count</th>
                                                <th style={{ padding: '12px 16px' }}>Density</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stats.map((s, i) => (
                                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <td style={{ padding: '10px 16px', color: 'white' }}>{s.word}</td>
                                                    <td style={{ padding: '10px 16px', color: '#fb923c' }}>{s.count}</td>
                                                    <td style={{ padding: '10px 16px', color: '#9ca3af' }}>{s.density}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div style={{ padding: 40, textAlign: 'center', color: '#6b7280' }}>
                                        Results will appear here.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
