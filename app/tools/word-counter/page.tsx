"use client";

import { useState, useEffect } from "react";
import { Copy, Check, AlignLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function WordCounter() {
    const [text, setText] = useState("");
    const [stats, setStats] = useState({
        words: 0,
        chars: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0
    });

    useEffect(() => {
        analyzeText();
    }, [text]);

    const analyzeText = () => {
        if (!text) {
            setStats({ words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: 0 });
            return;
        }

        const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        const chars = text.length;
        const charsNoSpaces = text.replace(/\s/g, '').length;
        const sentences = text.split(/[.!?]+/).filter(Boolean).length;
        const paragraphs = text.split(/\n\n+/).filter(Boolean).length;
        const readingTime = Math.ceil(words / 200); // 200 words per minute

        setStats({ words, chars, charsNoSpaces, sentences, paragraphs, readingTime });
    };

    const clearText = () => {
        setText("");
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📊</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>Word Counter</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Analyze text statistics in real-time</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16, marginBottom: 24 }}>
                        {[
                            { label: "Words", value: stats.words, color: '#fb923c' },
                            { label: "Characters", value: stats.chars, color: '#facc15' },
                            { label: "Sentences", value: stats.sentences, color: '#4ade80' },
                            { label: "Paragraphs", value: stats.paragraphs, color: '#60a5fa' },
                            { label: "Reading Time", value: `~${stats.readingTime} min`, color: '#a78bfa' },
                        ].map((stat, i) => (
                            <div key={i} className="glass-card" style={{ padding: 24, borderRadius: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 28, fontWeight: 'bold', color: stat.color, marginBottom: 4 }}>{stat.value}</div>
                                <div style={{ fontSize: 13, color: '#9ca3af' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-card" style={{ borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 500, color: '#fb923c' }}>Text Input</span>
                            <button onClick={clearText} className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}>
                                <RefreshCw style={{ width: 14, height: 14 }} /> Clear
                            </button>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Start typing or paste your text here to analyze..."
                            style={{ flex: 1, minHeight: 400, background: 'transparent', border: 'none', padding: 24, color: '#e5e7eb', fontFamily: 'sans-serif', fontSize: 16, resize: 'none', outline: 'none', lineHeight: 1.6 }}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}
