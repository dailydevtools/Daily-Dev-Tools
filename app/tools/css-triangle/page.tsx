"use client";

import { useState } from "react";
import { Play, Copy } from "lucide-react";
import Link from "next/link";

export default function CssTriangle() {
    const [direction, setDirection] = useState("top");
    const [color, setColor] = useState("#fb923c");
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    const generate = () => {
        let css = `width: 0;
height: 0;
border-style: solid;`;

        if (direction === "top") {
            css += `\nborder-width: 0 ${width / 2}px ${height}px ${width / 2}px;
border-color: transparent transparent ${color} transparent;`;
        } else if (direction === "bottom") {
            css += `\nborder-width: ${height}px ${width / 2}px 0 ${width / 2}px;
border-color: ${color} transparent transparent transparent;`;
        } else if (direction === "left") {
            css += `\nborder-width: ${height / 2}px ${width}px ${height / 2}px 0;
border-color: transparent ${color} transparent transparent;`;
        } else if (direction === "right") {
            css += `\nborder-width: ${height / 2}px 0 ${height / 2}px ${width}px;
border-color: transparent transparent transparent ${color};`;
        } else if (direction === "top-left") {
            css += `\nborder-width: ${height}px ${width}px 0 0;
border-color: ${color} transparent transparent transparent;`;
        } else if (direction === "top-right") {
            css += `\nborder-width: 0 ${width}px ${height}px 0;
border-color: transparent ${color} transparent transparent;`;
        } else if (direction === "bottom-left") {
            css += `\nborder-width: ${height}px 0 0 ${width}px;
border-color: transparent transparent transparent ${color};`;
        } else if (direction === "bottom-right") {
            css += `\nborder-width: 0 0 ${height}px ${width}px;
border-color: transparent transparent ${color} transparent;`;
        }

        return css;
    };

    const css = generate();

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                        <div className="glass-card" style={{ padding: 40 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Direction</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                                        {['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].map(d => (
                                            <button
                                                key={d} onClick={() => setDirection(d)}
                                                style={{
                                                    padding: 8, borderRadius: 8, border: '1px solid',
                                                    borderColor: direction === d ? '#fb923c' : 'rgba(255,255,255,0.1)',
                                                    background: direction === d ? 'rgba(251, 146, 60, 0.2)' : 'rgba(255,255,255,0.05)',
                                                    color: direction === d ? '#fb923c' : 'white', fontSize: 12
                                                }}
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Color</label>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 40, height: 40, padding: 0, border: 'none', borderRadius: 8, background: 'none' }} />
                                        <input type="text" value={color} onChange={e => setColor(e.target.value)} className="input-field" style={{ flex: 1, padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 24 }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Width (px)</label>
                                        <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Height (px)</label>
                                        <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div className="glass-card" style={{ padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', minHeight: 200 }}>
                                <div style={{
                                    width: 0, height: 0, borderStyle: 'solid',
                                    borderWidth: direction === 'top' ? `0 ${width / 2}px ${height}px ${width / 2}px` :
                                        direction === 'bottom' ? `${height}px ${width / 2}px 0 ${width / 2}px` :
                                            direction === 'left' ? `${height / 2}px ${width}px ${height / 2}px 0` :
                                                direction === 'right' ? `${height / 2}px 0 ${height / 2}px ${width}px` :
                                                    direction === 'top-left' ? `${height}px ${width}px 0 0` :
                                                        direction === 'top-right' ? `0 ${width}px ${height}px 0` :
                                                            direction === 'bottom-left' ? `${height}px 0 0 ${width}px` :
                                                                `0 0 ${height}px ${width}px`,
                                    borderColor: direction === 'top' ? `transparent transparent ${color} transparent` :
                                        direction === 'bottom' ? `${color} transparent transparent transparent` :
                                            direction === 'left' ? `transparent ${color} transparent transparent` :
                                                direction === 'right' ? `transparent transparent transparent ${color}` :
                                                    direction === 'top-left' ? `${color} transparent transparent transparent` :
                                                        direction === 'top-right' ? `transparent ${color} transparent transparent` :
                                                            direction === 'bottom-left' ? `transparent transparent transparent ${color}` :
                                                                `transparent transparent ${color} transparent`
                                }} />
                            </div>

                            <div className="glass-card" style={{ padding: 0 }}>
                                <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', color: '#9ca3af', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>CSS Output</div>
                                <textarea readOnly value={css} style={{ width: '100%', height: 120, padding: 20, borderRadius: 0, background: 'transparent', border: 'none', color: '#fb923c', fontFamily: 'monospace', resize: 'none' }} />
                                <div style={{ padding: 12, textAlign: 'right', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <button onClick={() => navigator.clipboard.writeText(css)} className="btn-secondary">Copy</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
