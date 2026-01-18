"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Lock } from "lucide-react";
import Link from "next/link";

export default function PasswordGenerator() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [useUppercase, setUseUppercase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
    const [copied, setCopied] = useState(false);

    // Generate on load
    if (!password) generatePassword();

    function generatePassword() {
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let chars = lower;
        if (useUppercase) chars += upper;
        if (useNumbers) chars += numbers;
        if (useSymbols) chars += symbols;

        let generated = "";
        for (let i = 0; i < length; i++) {
            generated += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(generated);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            {/* Navbar removed */}

            <div style={{ position: 'relative', zIndex: 10, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🔑</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>Password Generator</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Create secure, random passwords instantly</p>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '40px', borderRadius: 24, marginBottom: 24, textAlign: 'center' }}>
                        <div style={{
                            fontSize: 32, fontWeight: 'bold', color: '#4ade80', fontFamily: 'monospace',
                            marginBottom: 24, wordBreak: 'break-all', minHeight: 48
                        }}>
                            {password}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                            <button onClick={generatePassword} className="btn-primary" style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <RefreshCw style={{ width: 18, height: 18 }} /> Generate New
                            </button>
                            <button onClick={copyToClipboard} className="btn-secondary" style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                {copied ? <Check style={{ width: 18, height: 18, color: '#22c55e' }} /> : <Copy style={{ width: 18, height: 18 }} />}
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: 32, borderRadius: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 20 }}>Configuration</h3>

                        <div style={{ marginBottom: 24 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <label style={{ color: '#9ca3af' }}>Password Length</label>
                                <span style={{ color: '#fb923c', fontWeight: 'bold' }}>{length}</span>
                            </div>
                            <input
                                type="range"
                                min="8"
                                max="64"
                                value={length}
                                onChange={(e) => setLength(Number(e.target.value))}
                                style={{ width: '100%', accentColor: '#fb923c' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.03)' }}>
                                <input type="checkbox" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#fb923c' }} />
                                <span style={{ color: 'white' }}>Uppercase (A-Z)</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.03)' }}>
                                <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#fb923c' }} />
                                <span style={{ color: 'white' }}>Numbers (0-9)</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.03)' }}>
                                <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#fb923c' }} />
                                <span style={{ color: 'white' }}>Symbols (!@#$)</span>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
