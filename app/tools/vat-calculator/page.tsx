"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import Link from "next/link";

export default function VatCalculator() {
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState("20");

    const net = Number(amount);
    const r = Number(rate) / 100;

    const addedVat = (net * r).toFixed(2);
    const totalWith = (net * (1 + r)).toFixed(2);

    const removedVat = (net - (net / (1 + r))).toFixed(2);
    const totalWithout = (net / (1 + r)).toFixed(2);

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Amount</label>
                                <input
                                    type="number" value={amount} onChange={e => setAmount(e.target.value)}
                                    className="input-field" placeholder="100.00"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                            <div style={{ width: 120 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>VAT Rate (%)</label>
                                <input
                                    type="number" value={rate} onChange={e => setRate(e.target.value)}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>Add VAT</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ color: '#6b7280' }}>Net Amount</span>
                                    <span style={{ color: 'white' }}>{amount || "0.00"}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                    <span style={{ color: '#6b7280' }}>VAT Amount</span>
                                    <span style={{ color: '#fb923c' }}>{addedVat}</span>
                                </div>
                                <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 16 }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <span style={{ color: 'white', fontWeight: 600 }}>Gross Total</span>
                                    <span style={{ fontSize: 24, fontWeight: 700, color: '#22c55e' }}>{totalWith}</span>
                                </div>
                            </div>

                            <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>Remove VAT</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ color: '#6b7280' }}>Gross Amount</span>
                                    <span style={{ color: 'white' }}>{amount || "0.00"}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                    <span style={{ color: '#6b7280' }}>VAT Amount</span>
                                    <span style={{ color: '#fb923c' }}>{removedVat}</span>
                                </div>
                                <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 16 }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <span style={{ color: 'white', fontWeight: 600 }}>Net Total</span>
                                    <span style={{ fontSize: 24, fontWeight: 700, color: '#22c55e' }}>{totalWithout}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
