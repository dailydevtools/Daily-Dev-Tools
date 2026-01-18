"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import Link from "next/link";

export default function PrimeFactors() {
    const [num, setNum] = useState("");
    const [factors, setFactors] = useState<number[]>([]);
    const [isPrime, setIsPrime] = useState(false);

    const calculate = (nStr: string) => {
        setNum(nStr);
        const n = parseInt(nStr);
        if (isNaN(n) || n < 2) {
            setFactors([]);
            setIsPrime(false);
            return;
        }

        const f: number[] = [];
        let d = 2;
        let temp = n;
        while (d * d <= temp) {
            while (temp % d === 0) {
                f.push(d);
                temp /= d;
            }
            d++;
        }
        if (temp > 1) f.push(temp);

        setFactors(f);
        setIsPrime(f.length === 1 && f[0] === n);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                        <div style={{ marginBottom: 32 }}>
                            <label style={{ display: 'block', marginBottom: 12, color: '#9ca3af', fontSize: 13 }}>Enter a number</label>
                            <input
                                type="number" value={num} onChange={e => calculate(e.target.value)}
                                className="input-field"
                                placeholder="e.g. 120"
                                style={{ width: '100%', padding: 16, fontSize: 24, textAlign: 'center', borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                            />
                        </div>

                        {factors.length > 0 && (
                            <div>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 12 }}>Prime Factors</div>
                                <div style={{ fontSize: 32, fontWeight: 700, color: 'white', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
                                    {factors.map((f, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span style={{ color: '#fb923c' }}>{f}</span>
                                            {i < factors.length - 1 && <span style={{ color: '#6b7280', fontSize: 20 }}>×</span>}
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: 24, padding: '8px 16px', borderRadius: 20, background: isPrime ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)', display: 'inline-block', color: isPrime ? '#22c55e' : '#9ca3af' }}>
                                    {isPrime ? "This number is Prime!" : "This number is Composite"}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
