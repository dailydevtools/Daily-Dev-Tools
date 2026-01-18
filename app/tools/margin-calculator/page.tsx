"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import Link from "next/link";

export default function MarginCalculator() {
    const [cost, setCost] = useState("");
    const [revenue, setRevenue] = useState("");

    const c = Number(cost);
    const r = Number(revenue);
    const profit = r - c;
    const margin = r ? (profit / r) * 100 : 0;
    const markup = c ? (profit / c) * 100 : 0;

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Cost ($)</label>
                                <input
                                    type="number" value={cost} onChange={e => setCost(e.target.value)}
                                    className="input-field" placeholder="50.00"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Revenue ($)</label>
                                <input
                                    type="number" value={revenue} onChange={e => setRevenue(e.target.value)}
                                    className="input-field" placeholder="100.00"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
                            <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Net Profit</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: profit >= 0 ? '#22c55e' : '#ef4444' }}>${profit.toFixed(2)}</div>
                            </div>
                            <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Gross Margin</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: '#fb923c' }}>{margin.toFixed(2)}%</div>
                            </div>
                            <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Markup</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: '#3b82f6' }}>{markup.toFixed(2)}%</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
