"use client";

import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import Link from "next/link";

export default function LoanCalculator() {
    const [amount, setAmount] = useState(100000);
    const [rate, setRate] = useState(5);
    const [term, setTerm] = useState(30);
    const [termType, setTermType] = useState<"years" | "months">("years");

    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    useEffect(() => {
        calculate();
    }, [amount, rate, term, termType]);

    const calculate = () => {
        const p = amount;
        const r = rate / 100 / 12;
        const n = termType === "years" ? term * 12 : term;

        if (p <= 0 || r <= 0 || n <= 0) return;

        const x = Math.pow(1 + r, n);
        const monthly = (p * x * r) / (x - 1);

        if (isFinite(monthly)) {
            setMonthlyPayment(monthly);
            setTotalPayment(monthly * n);
            setTotalInterest((monthly * n) - p);
        }
    };

    const formatMoney = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

    // Chart calculation
    const total = amount + totalInterest;
    const pPerc = total > 0 ? (amount / total) * 100 : 100;

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
                        <div className="glass-card" style={{ padding: 32 }}>
                            <h2 style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Calculator size={20} color="#fb923c" /> Loan Details
                            </h2>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Loan Amount ($)</label>
                                <input
                                    type="number"
                                    value={amount} onChange={e => setAmount(Number(e.target.value))}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 16 }}
                                />
                                <input
                                    type="range" min="1000" max="1000000" step="1000"
                                    value={amount} onChange={e => setAmount(Number(e.target.value))}
                                    style={{ width: '100%', marginTop: 8 }}
                                />
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Interest Rate (% per year)</label>
                                <input
                                    type="number"
                                    value={rate} onChange={e => setRate(Number(e.target.value))}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 16 }}
                                />
                                <input
                                    type="range" min="0.1" max="30" step="0.1"
                                    value={rate} onChange={e => setRate(Number(e.target.value))}
                                    style={{ width: '100%', marginTop: 8 }}
                                />
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Loan Term</label>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <input
                                        type="number"
                                        value={term} onChange={e => setTerm(Number(e.target.value))}
                                        className="input-field"
                                        style={{ flex: 1, padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 16 }}
                                    />
                                    <select
                                        value={termType} onChange={e => setTermType(e.target.value as any)}
                                        style={{ padding: '0 16px', borderRadius: 8, background: '#111', color: 'white', border: '1px solid #333' }}
                                    >
                                        <option value="years">Years</option>
                                        <option value="months">Months</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
                            <div style={{ marginBottom: 32 }}>
                                <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 8 }}>Monthly Payment</div>
                                <div style={{ fontSize: 48, fontWeight: 'bold', color: '#22c55e' }}>{formatMoney(monthlyPayment)}</div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32, textAlign: 'left' }}>
                                <div style={{ padding: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 12 }}>
                                    <div style={{ fontSize: 12, color: '#9ca3af' }}>Total Interest</div>
                                    <div style={{ fontSize: 18, fontWeight: 600, color: '#f97316' }}>{formatMoney(totalInterest)}</div>
                                </div>
                                <div style={{ padding: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 12 }}>
                                    <div style={{ fontSize: 12, color: '#9ca3af' }}>Total Payment</div>
                                    <div style={{ fontSize: 18, fontWeight: 600, color: 'white' }}>{formatMoney(totalPayment)}</div>
                                </div>
                            </div>

                            {/* CSS Only Pie Chart */}
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                                <div style={{
                                    width: 160, height: 160, borderRadius: '50%',
                                    background: `conic-gradient(#3b82f6 0% ${pPerc}%, #f97316 ${pPerc}% 100%)`,
                                    position: 'relative'
                                }}>
                                    <div style={{ position: 'absolute', inset: 30, background: '#000', borderRadius: '50%' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3b82f6' }} /> Principal
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f97316' }} /> Interest
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
