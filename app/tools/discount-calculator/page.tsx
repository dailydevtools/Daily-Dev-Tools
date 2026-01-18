"use client";

import { useState } from "react";
import { Tag, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function DiscountCalculator() {
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [tax, setTax] = useState("");

    const calculate = () => {
        const p = parseFloat(price) || 0;
        const d = parseFloat(discount) || 0;
        const t = parseFloat(tax) || 0;

        const savings = p * (d / 100);
        const afterDesc = p - savings;
        const taxAmount = afterDesc * (t / 100);
        const final = afterDesc + taxAmount;

        return { savings, afterDesc, taxAmount, final };
    };

    const { savings, afterDesc, taxAmount, final } = calculate();
    const format = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
                        <div className="glass-card" style={{ padding: 32 }}>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Original Price ($)</label>
                                <input
                                    type="number"
                                    value={price} onChange={e => setPrice(e.target.value)}
                                    placeholder="100.00"
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Discount (% off)</label>
                                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                    <input
                                        type="number"
                                        value={discount} onChange={e => setDiscount(e.target.value)}
                                        placeholder="20"
                                        className="input-field"
                                        style={{ flex: 1, padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18, minWidth: 80 }}
                                    />
                                    {[10, 20, 30, 50].map(d => (
                                        <button key={d} onClick={() => setDiscount(String(d))} className="btn-secondary" style={{ padding: '8px 16px' }}>{d}%</button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Sales Tax (%) (Optional)</label>
                                <input
                                    type="number"
                                    value={tax} onChange={e => setTax(e.target.value)}
                                    placeholder="0"
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: 32, textAlign: 'center', background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)' }}>
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 8 }}>Final Price</div>
                                <div style={{ fontSize: 56, fontWeight: 'bold', color: 'white' }}>{format(final)}</div>
                            </div>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: 14 }}>
                                    <span>Original Price</span>
                                    <span style={{ textDecoration: 'line-through' }}>{format(parseFloat(price) || 0)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#22c55e', fontSize: 16, fontWeight: 500 }}>
                                    <span>You Save</span>
                                    <span>-{format(savings)}</span>
                                </div>
                                {parseFloat(tax) > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f97316', fontSize: 14 }}>
                                        <span>Tax ({tax}%)</span>
                                        <span>+{format(taxAmount)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
