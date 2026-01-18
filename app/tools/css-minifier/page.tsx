"use client";

import { useState } from "react";
import { Copy, Check, Download, Upload, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CssMinifier() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState({ original: 0, minified: 0, savings: 0 });

    const minifyCss = () => {
        if (!input) return;

        let minified = input
            .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
            .replace(/\s+/g, " ")             // Compress whitespace
            .replace(/\s*([{}:;,])\s*/g, "$1") // Remove space around separators
            .replace(/;}/g, "}")              // Remove last semicolon
            .trim();

        setOutput(minified);

        const originalSize = new Blob([input]).size;
        const minifiedSize = new Blob([minified]).size;
        const savings = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize * 100).toFixed(1) : 0;

        setStats({
            original: originalSize,
            minified: minifiedSize,
            savings: Number(savings)
        });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
        setStats({ original: 0, minified: 0, savings: 0 });
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            {/* Navbar removed */}

            <div style={{ position: 'relative', zIndex: 10, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🎨</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>CSS Minifier</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Compress and optimize CSS code to reduce file size</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                        <button onClick={minifyCss} className="btn-primary" style={{ padding: '10px 24px' }}>
                            Minify CSS
                        </button>
                        <button onClick={clearAll} className="btn-secondary" style={{ padding: '10px 24px', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Trash2 style={{ width: 16, height: 16 }} /> Clear
                        </button>
                        {stats.savings > 0 && (
                            <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, fontSize: 13 }}>
                                <span style={{ color: '#9ca3af' }}>Original: <b style={{ color: 'white' }}>{stats.original} B</b></span>
                                <span style={{ color: '#9ca3af' }}>Minified: <b style={{ color: '#4ade80' }}>{stats.minified} B</b></span>
                                <span style={{ color: '#fb923c', fontWeight: 'bold' }}>Saved {stats.savings}%</span>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
                        <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af' }}>Input CSS</span>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Paste your CSS code here..."
                                style={{ flex: 1, height: 400, background: 'transparent', border: 'none', padding: 20, fontFamily: 'monospace', fontSize: 13, color: '#e5e7eb', resize: 'none', outline: 'none' }}
                            />
                        </div>

                        <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 14, fontWeight: 500, color: '#fb923c' }}>Minified Output</span>
                                <button onClick={copyToClipboard} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: copied ? '#22c55e' : '#9ca3af' }}>
                                    {copied ? <Check style={{ width: 16, height: 16 }} /> : <Copy style={{ width: 16, height: 16 }} />}
                                </button>
                            </div>
                            <textarea
                                value={output}
                                readOnly
                                placeholder="Minified CSS will appear here..."
                                style={{ flex: 1, height: 400, background: 'transparent', border: 'none', padding: 20, fontFamily: 'monospace', fontSize: 13, color: '#4ade80', resize: 'none', outline: 'none' }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
