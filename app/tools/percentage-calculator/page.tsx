"use client";

import { useState } from "react";
import { Percent } from "lucide-react";
import Link from "next/link";

export default function PercentageCalculator() {
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [val3, setVal3] = useState("");
    const [val4, setVal4] = useState("");
    const [val5, setVal5] = useState("");
    const [val6, setVal6] = useState("");

    const res1 = val1 && val2 ? ((Number(val1) / 100) * Number(val2)).toFixed(2) : "-";
    const res2 = val3 && val4 ? ((Number(val3) / Number(val4)) * 100).toFixed(2) : "-";
    const res3 = val5 && val6 ? (((Number(val6) - Number(val5)) / Number(val5)) * 100).toFixed(2) : "-";

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                        <div className="glass-card" style={{ padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, color: 'white', fontSize: 18 }}>
                                <span>What is</span>
                                <input type="number" value={val1} onChange={e => setVal1(e.target.value)} className="input-field" style={{ width: 80, padding: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8 }} />
                                <span>% of</span>
                                <input type="number" value={val2} onChange={e => setVal2(e.target.value)} className="input-field" style={{ width: 80, padding: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8 }} />
                                <span>?</span>
                            </div>
                            <div style={{ fontSize: 32, fontWeight: 700, color: '#fb923c', minWidth: 100, textAlign: 'right' }}>{res1}</div>
                        </div>

                        <div className="glass-card" style={{ padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, color: 'white', fontSize: 18 }}>
                                <input type="number" value={val3} onChange={e => setVal3(e.target.value)} className="input-field" style={{ width: 80, padding: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8 }} />
                                <span>is what % of</span>
                                <input type="number" value={val4} onChange={e => setVal4(e.target.value)} className="input-field" style={{ width: 80, padding: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8 }} />
                                <span>?</span>
                            </div>
                            <div style={{ fontSize: 32, fontWeight: 700, color: '#fb923c', minWidth: 100, textAlign: 'right' }}>{res2}%</div>
                        </div>

                        <div className="glass-card" style={{ padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, color: 'white', fontSize: 18 }}>
                                <span>% change from</span>
                                <input type="number" value={val5} onChange={e => setVal5(e.target.value)} className="input-field" style={{ width: 80, padding: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8 }} />
                                <span>to</span>
                                <input type="number" value={val6} onChange={e => setVal6(e.target.value)} className="input-field" style={{ width: 80, padding: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8 }} />
                                <span>?</span>
                            </div>
                            <div style={{ fontSize: 32, fontWeight: 700, color: Number(res3) > 0 ? '#22c55e' : '#fb923c', minWidth: 100, textAlign: 'right' }}>{res3}%</div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
