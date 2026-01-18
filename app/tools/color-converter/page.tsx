"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ColorConverter() {
    const [hex, setHex] = useState("#3b82f6");
    const [rgb, setRgb] = useState("59, 130, 246");
    const [hsl, setHsl] = useState("217, 91%, 60%");

    // Conversion logic is complex bi-directional. 
    // For simplicity, we drive from HEX (master) or update others on change.
    // We'll use simple functions.

    const hexToRgb = (h: string) => {
        let r = 0, g = 0, b = 0;
        if (h.length === 4) {
            r = parseInt("0x" + h[1] + h[1]);
            g = parseInt("0x" + h[2] + h[2]);
            b = parseInt("0x" + h[3] + h[3]);
        } else if (h.length === 7) {
            r = parseInt("0x" + h[1] + h[2]);
            g = parseInt("0x" + h[3] + h[4]);
            b = parseInt("0x" + h[5] + h[6]);
        }
        return [r, g, b];
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    };

    const handleHexChange = (val: string) => {
        setHex(val);
        if (/^#[0-9A-F]{6}$/i.test(val)) {
            const [r, g, b] = hexToRgb(val);
            setRgb(`${r}, ${g}, ${b}`);
            const [h, s, l] = rgbToHsl(r, g, b);
            setHsl(`${h}, ${s}%, ${l}%`);
        }
    };

    // Simplistic handlers (omitted reverse logic for brevity in this step, focusing on HEX -> Others)

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 200px', gap: 40 }}>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>HEX</label>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 8, background: hex, border: '1px solid rgba(255,255,255,0.2)' }} />
                                    <input
                                        type="text" value={hex} onChange={e => handleHexChange(e.target.value)}
                                        className="input-field"
                                        style={{ flex: 1, padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: 'monospace' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>RGB</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text" value={rgb} readOnly
                                        className="input-field"
                                        style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', fontFamily: 'monospace' }}
                                    />
                                    <button onClick={() => navigator.clipboard.writeText(`rgb(${rgb})`)} style={{ position: 'absolute', right: 8, top: 8, padding: '4px 8px', borderRadius: 4, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', fontSize: 12 }}>Copy</button>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>HSL</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text" value={hsl} readOnly
                                        className="input-field"
                                        style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', fontFamily: 'monospace' }}
                                    />
                                    <button onClick={() => navigator.clipboard.writeText(`hsl(${hsl})`)} style={{ position: 'absolute', right: 8, top: 8, padding: '4px 8px', borderRadius: 4, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', fontSize: 12 }}>Copy</button>
                                </div>
                            </div>
                            <div style={{ fontSize: 12, color: '#6b7280' }}>* Currently supports HEX to RGB/HSL conversion only.</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: 140, height: 140, borderRadius: '50%', background: hex, boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)' }} />
                            <input type="color" value={hex} onChange={e => handleHexChange(e.target.value)} style={{ width: '100%', cursor: 'pointer' }} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
