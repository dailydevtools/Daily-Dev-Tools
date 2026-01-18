"use client";

import { useState } from "react";
import { Copy, Layers } from "lucide-react";
import Link from "next/link";

export default function BoxShadowGenerator() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(10);
    const [blur, setBlur] = useState(20);
    const [spread, setSpread] = useState(-5);
    const [color, setColor] = useState("#000000");
    const [opacity, setOpacity] = useState(0.3);
    const [inset, setInset] = useState(false);

    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const shadow = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
    const css = `box-shadow: ${shadow};`;

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 40, alignItems: 'start' }}>
                        <div className="glass-card" style={{ padding: 32 }}>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#9ca3af' }}>
                                    <span>Horizontal (X)</span> <span>{x}px</span>
                                </label>
                                <input type="range" min="-100" max="100" value={x} onChange={e => setX(Number(e.target.value))} style={{ width: '100%' }} />
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#9ca3af' }}>
                                    <span>Vertical (Y)</span> <span>{y}px</span>
                                </label>
                                <input type="range" min="-100" max="100" value={y} onChange={e => setY(Number(e.target.value))} style={{ width: '100%' }} />
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#9ca3af' }}>
                                    <span>Blur</span> <span>{blur}px</span>
                                </label>
                                <input type="range" min="0" max="100" value={blur} onChange={e => setBlur(Number(e.target.value))} style={{ width: '100%' }} />
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#9ca3af' }}>
                                    <span>Spread</span> <span>{spread}px</span>
                                </label>
                                <input type="range" min="-100" max="100" value={spread} onChange={e => setSpread(Number(e.target.value))} style={{ width: '100%' }} />
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Color & Opacity</label>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 40, height: 40, borderRadius: 8, border: 'none', padding: 0, background: 'none' }} />
                                    <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={e => setOpacity(Number(e.target.value))} style={{ flex: 1 }} />
                                </div>
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'white' }}>
                                    <input type="checkbox" checked={inset} onChange={e => setInset(e.target.checked)} style={{ width: 16, height: 16 }} />
                                    Inset
                                </label>
                            </div>

                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div style={{ height: 400, background: 'white', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px', opacity: 0.1, pointerEvents: 'none' }} />

                                <div style={{
                                    width: 200, height: 200,
                                    background: '#fb923c',
                                    borderRadius: 12,
                                    boxShadow: shadow
                                }} />
                            </div>

                            <div className="glass-card" style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 14 }}>
                                <code>{css}</code>
                                <button onClick={() => navigator.clipboard.writeText(css)} className="btn-secondary" style={{ padding: '8px 16px', fontSize: 12 }}>
                                    <Copy size={16} /> Copy
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
