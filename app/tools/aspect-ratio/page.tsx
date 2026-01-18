"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

export default function AspectRatio() {
    const [w1, setW1] = useState<number>(1920);
    const [h1, setH1] = useState<number>(1080);
    const [w2, setW2] = useState<number>(1280);
    const [h2, setH2] = useState<number>(720);

    const calculateH2 = (newW2: number) => {
        setW2(newW2);
        setH2(Math.round((newW2 * h1) / w1));
    };

    const calculateW2 = (newH2: number) => {
        setH2(newH2);
        setW2(Math.round((newH2 * w1) / h1));
    };

    const ratio = (w1 / h1).toFixed(3);
    const common = w1 === 1920 && h1 === 1080 ? "16:9" : w1 === w1 ? `${w1}:${h1}` : "";

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>

                        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 40 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Original Width</label>
                                <input
                                    type="number" value={w1} onChange={e => setW1(Number(e.target.value))}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Original Height</label>
                                <input
                                    type="number" value={h1} onChange={e => setH1(Number(e.target.value))}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>
                        </div>

                        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 40 }} />

                        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#fb923c', fontSize: 13 }}>New Width</label>
                                <input
                                    type="number" value={w2} onChange={e => calculateH2(Number(e.target.value))}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(251, 146, 60, 0.1)', border: '1px solid rgba(251, 146, 60, 0.2)', color: '#fb923c' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#fb923c', fontSize: 13 }}>New Height</label>
                                <input
                                    type="number" value={h2} onChange={e => calculateW2(Number(e.target.value))}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(251, 146, 60, 0.1)', border: '1px solid rgba(251, 146, 60, 0.2)', color: '#fb923c' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: 40, textAlign: 'center' }}>
                            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Result Ratio</div>
                            <div style={{ fontSize: 48, fontWeight: 700, color: 'white' }}>{common === "16:9" ? "16:9" : ratio}</div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
