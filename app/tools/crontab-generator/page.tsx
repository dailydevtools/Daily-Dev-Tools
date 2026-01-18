"use client";

import { useState } from "react";
import { RefreshCw, Copy } from "lucide-react";
import Link from "next/link";

export default function CrontabGenerator() {
    const [min, setMin] = useState("*");
    const [hour, setHour] = useState("*");
    const [day, setDay] = useState("*");
    const [month, setMonth] = useState("*");
    const [week, setWeek] = useState("*");

    const result = `${min} ${hour} ${day} ${month} ${week}`;

    const common = [
        { l: "Every minute", v: "* * * * *" },
        { l: "Every 5 minutes", v: "*/5 * * * *" },
        { l: "Every hour", v: "0 * * * *" },
        { l: "Every day at midnight", v: "0 0 * * *" },
        { l: "Every week", v: "0 0 * * 0" },
        { l: "Every month", v: "0 0 1 * *" },
    ];

    const setPreset = (v: string) => {
        const p = v.split(' ');
        setMin(p[0]); setHour(p[1]); setDay(p[2]); setMonth(p[3]); setWeek(p[4]);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>

                        <div style={{ padding: 40, background: 'rgba(255,255,255,0.05)', borderRadius: 16, textAlign: 'center', marginBottom: 40 }}>
                            <div style={{ fontSize: 48, fontWeight: 700, color: '#fb923c', fontFamily: 'monospace', marginBottom: 16, letterSpacing: 4 }}>
                                {result}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontSize: 13, color: '#9ca3af' }}>
                                <div style={{ width: 40 }}>MIN</div>
                                <div style={{ width: 40 }}>HOUR</div>
                                <div style={{ width: 40 }}>DAY</div>
                                <div style={{ width: 40 }}>MON</div>
                                <div style={{ width: 40 }}>WEEK</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 40 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontSize: 12, color: '#9ca3af' }}>Minute</label>
                                <input type="text" value={min} onChange={e => setMin(e.target.value)} className="input-field" style={{ width: '100%', textAlign: 'center', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontSize: 12, color: '#9ca3af' }}>Hour</label>
                                <input type="text" value={hour} onChange={e => setHour(e.target.value)} className="input-field" style={{ width: '100%', textAlign: 'center', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontSize: 12, color: '#9ca3af' }}>Day</label>
                                <input type="text" value={day} onChange={e => setDay(e.target.value)} className="input-field" style={{ width: '100%', textAlign: 'center', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontSize: 12, color: '#9ca3af' }}>Month</label>
                                <input type="text" value={month} onChange={e => setMonth(e.target.value)} className="input-field" style={{ width: '100%', textAlign: 'center', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontSize: 12, color: '#9ca3af' }}>Weekday</label>
                                <input type="text" value={week} onChange={e => setWeek(e.target.value)} className="input-field" style={{ width: '100%', textAlign: 'center', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 12 }}>Presets</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                                {common.map(c => (
                                    <button
                                        key={c.l} onClick={() => setPreset(c.v)}
                                        className="btn-secondary"
                                        style={{ fontSize: 13, padding: '8px 16px' }}
                                    >
                                        {c.l}
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
