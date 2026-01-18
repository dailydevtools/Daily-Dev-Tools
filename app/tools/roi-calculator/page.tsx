"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

export default function RoiCalculator() {
    const [invested, setInvested] = useState("");
    const [returned, setReturned] = useState("");
    const [years, setYears] = useState("1");

    const inv = Number(invested);
    const ret = Number(returned);
    const dur = Number(years);

    const gain = ret - inv;
    const roi = inv ? (gain / inv) * 100 : 0;

    // Annualized: ((End / Start) ^ (1 / Years)) - 1
    const annualized = (inv && ret && dur) ? ((Math.pow(ret / inv, 1 / dur) - 1) * 100) : 0;

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Inital Investment ($)</label>
                                <input
                                    type="number" value={invested} onChange={e => setInvested(e.target.value)}
                                    className="input-field" placeholder="1000.00"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Final Value ($)</label>
                                <input
                                    type="number" value={returned} onChange={e => setReturned(e.target.value)}
                                    className="input-field" placeholder="1500.00"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                            <div style={{ width: 120 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Time (Years)</label>
                                <input
                                    type="number" value={years} onChange={e => setYears(e.target.value)}
                                    className="input-field" placeholder="1"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
                            <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Total Gain</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: gain >= 0 ? '#22c55e' : '#ef4444' }}>${gain.toFixed(2)}</div>
                            </div>
                            <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Total ROI</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: '#fb923c' }}>{roi.toFixed(2)}%</div>
                            </div>
                            <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Annualized ROI</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: '#3b82f6' }}>{annualized.toFixed(2)}%</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
