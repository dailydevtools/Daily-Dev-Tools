"use client";

import { useState } from "react";
import { RefreshCw, Copy } from "lucide-react";
import Link from "next/link";

export default function TokenGenerator() {
    const [length, setLength] = useState(32);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [token, setToken] = useState("");

    const generate = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const nums = "0123456789";
        const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let pool = chars;
        if (includeNumbers) pool += nums;
        if (includeSymbols) pool += syms;

        let res = "";
        for (let i = 0; i < length; i++) {
            res += pool.charAt(Math.floor(Math.random() * pool.length));
        }
        setToken(res);
    };

    // Generate on mount or options change? Maybe just manual button or useEffect
    // Manual is better for "Generator" tools to avoid flicker
    // But initial state empty is sad.
    // We'll generate once on client side via useEffect to avoid hydration mismatch if random used

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ marginBottom: 32 }}>
                            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#9ca3af', fontSize: 13 }}>
                                <span>Length</span>
                                <span>{length} characters</span>
                            </label>
                            <input
                                type="range" min="8" max="128" step="1"
                                value={length} onChange={e => setLength(Number(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'white' }}>
                                <input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} style={{ width: 18, height: 18 }} />
                                Include Numbers
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'white' }}>
                                <input type="checkbox" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} style={{ width: 18, height: 18 }} />
                                Include Symbols
                            </label>
                        </div>

                        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                            <button onClick={generate} className="btn-primary" style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                <RefreshCw size={18} /> Generate Token
                            </button>
                        </div>

                        {token && (
                            <div style={{ position: 'relative' }}>
                                <textarea
                                    readOnly
                                    value={token}
                                    style={{ width: '100%', height: 120, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, color: '#fb923c', fontSize: 18, fontFamily: 'monospace', resize: 'none' }}
                                />
                                <button onClick={() => navigator.clipboard.writeText(token)} className="btn-secondary" style={{ position: 'absolute', top: 12, right: 12 }}>
                                    <Copy size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
