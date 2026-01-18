"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GradientGenerator() {
    const [color1, setColor1] = useState("#f97316");
    const [color2, setColor2] = useState("#facc15");
    const [angle, setAngle] = useState(135);
    const [type, setType] = useState("linear");
    const [copied, setCopied] = useState(false);

    const gradient = type === "linear"
        ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
        : `radial-gradient(circle, ${color1}, ${color2})`;

    const css = `background: ${gradient};`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const randomColor = () => {
        const r = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
        return `#${r()}${r()}${r()}`;
    };

    const randomize = () => {
        setColor1(randomColor());
        setColor2(randomColor());
        setAngle(Math.floor(Math.random() * 360));
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            {/* Main Content */}
            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
                        {/* Controls */}
                        <div className="glass-card" style={{ padding: 32 }}>
                            <h2 style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 24 }}>Configuration</h2>

                            <div style={{ marginBottom: 24 }}>
                                <label style={{ display: 'block', fontSize: 14, color: '#9ca3af', marginBottom: 12 }}>Colors</label>
                                <div style={{ display: 'flex', gap: 16 }}>
                                    <div style={{ flex: 1 }}>
                                        <input
                                            type="color"
                                            value={color1}
                                            onChange={(e) => setColor1(e.target.value)}
                                            style={{ width: '100%', height: 48, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'transparent' }}
                                        />
                                        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 13, color: '#d1d5db', fontFamily: 'monospace' }}>{color1}</div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <input
                                            type="color"
                                            value={color2}
                                            onChange={(e) => setColor2(e.target.value)}
                                            style={{ width: '100%', height: 48, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'transparent' }}
                                        />
                                        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 13, color: '#d1d5db', fontFamily: 'monospace' }}>{color2}</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: 24 }}>
                                <label style={{ display: 'block', fontSize: 14, color: '#9ca3af', marginBottom: 12 }}>Type</label>
                                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 4 }}>
                                    {['linear', 'radial'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setType(t)}
                                            style={{
                                                flex: 1,
                                                padding: '8px 0',
                                                borderRadius: 6,
                                                border: 'none',
                                                background: type === t ? 'rgba(255,255,255,0.1)' : 'transparent',
                                                color: type === t ? 'white' : '#6b7280',
                                                fontSize: 14,
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {type === 'linear' && (
                                <div style={{ marginBottom: 32 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                        <label style={{ fontSize: 14, color: '#9ca3af' }}>Angle</label>
                                        <span style={{ fontSize: 14, color: 'white' }}>{angle}°</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={angle}
                                        onChange={(e) => setAngle(Number(e.target.value))}
                                        style={{ width: '100%', cursor: 'pointer' }}
                                    />
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: 12 }}>
                                <button onClick={randomize} className="btn-secondary" style={{ flex: 1 }}>
                                    <RefreshCw size={16} /> Random
                                </button>
                            </div>
                        </div>

                        {/* Preview */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div
                                className="glass-card"
                                style={{
                                    flex: 1,
                                    minHeight: 300,
                                    background: gradient,
                                    borderRadius: 24,
                                    boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            />

                            <div className="glass-card" style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                                <code style={{ fontFamily: 'monospace', color: '#fb923c', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {css}
                                </code>
                                <button
                                    onClick={copyToClipboard}
                                    className="btn-primary"
                                    style={{ padding: '8px 16px', fontSize: 13 }}
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                    {copied ? 'Copied' : 'Copy CSS'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
