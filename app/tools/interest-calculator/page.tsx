"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

interface ChartData {
    year: number;
    principal: number;
    interest: number;
}

export default function InterestCalculator() {
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(5);
    const [years, setYears] = useState(10);
    const [type, setType] = useState<"compound" | "simple">("compound");
    const [frequency, setFrequency] = useState(12);

    const [result, setResult] = useState<{ total: number, interest: number } | null>(null);
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        calculate();
    }, [principal, rate, years, type, frequency]);

    const calculate = () => {
        const P = principal;
        const r = rate / 100;
        const t = years;
        const n = frequency;

        let A = 0;
        let data: ChartData[] = [];

        if (type === "simple") {
            A = P * (1 + r * t);
            for (let i = 1; i <= t; i++) {
                data.push({ year: i, principal: P, interest: (P * r * i) });
            }
        } else {
            A = P * Math.pow((1 + r / n), (n * t));
            for (let i = 1; i <= t; i++) {
                const val = P * Math.pow((1 + r / n), (n * i));
                data.push({ year: i, principal: P, interest: val - P });
            }
        }

        setResult({ total: A, interest: A - P });
        setChartData(data);
    };

    const format = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

    const maxVal = result ? result.total : 0;

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: 24, alignItems: 'start' }}>
                        <div className="glass-card" style={{ padding: 32 }}>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Principal ($)</label>
                                <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Interest Rate (%)</label>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="input-field" style={{ flex: 1, padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                                    <input type="range" min="1" max="20" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))} style={{ flex: 1 }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Time Period (Years)</label>
                                <input type="range" min="1" max="50" value={years} onChange={e => setYears(Number(e.target.value))} style={{ width: '100%', marginBottom: 8 }} />
                                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{years} Years</div>
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Type</label>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button onClick={() => setType('simple')} className={type === 'simple' ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1, padding: 12 }}>Simple</button>
                                    <button onClick={() => setType('compound')} className={type === 'compound' ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1, padding: 12 }}>Compound</button>
                                </div>
                            </div>
                            {type === 'compound' && (
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Compound Frequency</label>
                                    <select value={frequency} onChange={e => setFrequency(Number(e.target.value))} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#111', color: 'white' }}>
                                        <option value={1}>Annually</option>
                                        <option value={12}>Monthly</option>
                                        <option value={365}>Daily</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="glass-card" style={{ padding: 32 }}>
                            <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
                                <div>
                                    <div style={{ fontSize: 13, color: '#9ca3af' }}>Total Value</div>
                                    <div style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>{result ? format(result.total) : '-'}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 13, color: '#9ca3af' }}>Total Interest</div>
                                    <div style={{ fontSize: 32, fontWeight: 'bold', color: '#22c55e' }}>{result ? format(result.interest) : '-'}</div>
                                </div>
                            </div>

                            {/* CSS Bar Chart */}
                            <div style={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 8, paddingTop: 20, paddingBottom: 20 }}>
                                {chartData.map((d: ChartData) => {
                                    const pHeight = (d.principal / maxVal) * 100;
                                    const iHeight = (d.interest / maxVal) * 100;
                                    return (
                                        <div key={d.year} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column-reverse', position: 'relative' }} title={`Year ${d.year}: ${format(d.principal + d.interest)}`}>
                                            <div style={{ height: `${pHeight}%`, background: '#3b82f6', borderRadius: '0 0 2px 2px', opacity: 0.8 }} />
                                            <div style={{ height: `${iHeight}%`, background: '#22c55e', borderRadius: '2px 2px 0 0' }} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280', marginTop: 8 }}>
                                <span>Year 1</span>
                                <span>Year {years}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                                    <div style={{ width: 12, height: 12, borderRadius: 2, background: '#3b82f6' }} /> Principal
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                                    <div style={{ width: 12, height: 12, borderRadius: 2, background: '#22c55e' }} /> Interest
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}