"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Clock } from "lucide-react";
import Link from "next/link";

export default function CronGenerator() {
    const [min, setMin] = useState("*");
    const [hour, setHour] = useState("*");
    const [dom, setDom] = useState("*");
    const [month, setMonth] = useState("*");
    const [dow, setDow] = useState("*");
    const [copied, setCopied] = useState(false);

    const cronString = `${min} ${hour} ${dom} ${month} ${dow}`;

    const presets = [
        { name: "Every minute", value: "* * * * *" },
        { name: "Every hour", value: "0 * * * *" },
        { name: "Every day at midnight", value: "0 0 * * *" },
        { name: "Every Sunday", value: "0 0 * * 0" },
        { name: "Every month", value: "0 0 1 * *" },
        { name: "Every year", value: "0 0 1 1 *" },
    ];

    const loadPreset = (val: string) => {
        const parts = val.split(' ');
        if (parts.length === 5) {
            setMin(parts[0]);
            setHour(parts[1]);
            setDom(parts[2]);
            setMonth(parts[3]);
            setDow(parts[4]);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cronString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>⏰</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>Cron Generator</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Create and test cron schedule expressions</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 24 }}>

                        <div className="glass-card" style={{ padding: 40, borderRadius: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', color: '#fb923c', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Minute</label>
                                    <input type="text" value={min} onChange={(e) => setMin(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: 18, textAlign: 'center' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', color: '#fb923c', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Hour</label>
                                    <input type="text" value={hour} onChange={(e) => setHour(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: 18, textAlign: 'center' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', color: '#fb923c', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Day (Month)</label>
                                    <input type="text" value={dom} onChange={(e) => setDom(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: 18, textAlign: 'center' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', color: '#fb923c', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Month</label>
                                    <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: 18, textAlign: 'center' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', color: '#fb923c', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Day (Week)</label>
                                    <input type="text" value={dow} onChange={(e) => setDow(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: 18, textAlign: 'center' }} />
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: 24, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ fontSize: 28, fontFamily: 'monospace', color: '#4ade80', fontWeight: 'bold' }}>
                                    {cronString}
                                </div>
                                <button onClick={copyToClipboard} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px' }}>
                                    {copied ? <Check style={{ width: 18, height: 18 }} /> : <Copy style={{ width: 18, height: 18 }} />}
                                    Copy
                                </button>
                            </div>

                            <div style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6 }}>
                                <p>Format: <code>* * * * *</code> (Minute Hour DayOfMonth Month DayOfWeek)</p>
                                <p>Use <code>*</code> for "every", <code>*/n</code> for "every n", <code>1,2,3</code> for specific list.</p>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: 24, borderRadius: 24 }}>
                            <h3 style={{ color: 'white', fontWeight: 600, marginBottom: 16 }}>Common Presets</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {presets.map((preset) => (
                                    <button
                                        key={preset.name}
                                        onClick={() => loadPreset(preset.value)}
                                        className="hover:bg-white/5"
                                        style={{ textAlign: 'left', padding: '12px', borderRadius: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.05)', color: '#d1d5db', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        <span>{preset.name}</span>
                                        <span style={{ color: '#fb923c', fontFamily: 'monospace', fontSize: 12 }}>{preset.value}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
