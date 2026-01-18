"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

export default function RomanNumerals() {
    const [num, setNum] = useState("");
    const [roman, setRoman] = useState("");

    const toRoman = (n: number) => {
        if (isNaN(n) || n <= 0 || n >= 4000) return "";
        const map: any = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
        let r = '';
        for (const i in map) {
            while (n >= map[i]) {
                r += i;
                n -= map[i];
            }
        }
        return r;
    };

    const toNum = (r: string) => {
        if (!r) return "";
        const map: any = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
        let n = 0;
        let i = 0;
        r = r.toUpperCase();
        while (i < r.length) {
            const curr = map[r[i]];
            const next = map[r[i + 1]];
            if (next && next > curr) {
                n += next - curr;
                i += 2;
            } else {
                n += curr;
                i++;
            }
        }
        return isNaN(n) ? "" : n.toString();
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>

                        <div>
                            <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Decimal Number</label>
                            <input
                                type="number" value={num} onChange={e => { setNum(e.target.value); setRoman(toRoman(Number(e.target.value))); }}
                                className="input-field" placeholder="2024"
                                style={{ width: '100%', padding: 20, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 24, textAlign: 'center' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Roman Numeral</label>
                            <input
                                type="text" value={roman} onChange={e => { setRoman(e.target.value.toUpperCase()); setNum(toNum(e.target.value)); }}
                                className="input-field" placeholder="MMXXIV"
                                style={{ width: '100%', padding: 20, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fb923c', fontSize: 24, textAlign: 'center' }}
                            />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
