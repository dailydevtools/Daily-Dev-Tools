"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Link from "next/link";

interface JWTHeader {
    alg?: string;
    typ?: string;
    [key: string]: any;
}

interface JWTPayload {
    sub?: string;
    name?: string;
    iat?: number;
    exp?: number;
    [key: string]: any;
}

export default function JWTDecoder() {
    const [input, setInput] = useState("");
    const [header, setHeader] = useState<JWTHeader | null>(null);
    const [payload, setPayload] = useState<JWTPayload | null>(null);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState<string | null>(null);

    const decodeJWT = () => {
        try {
            const parts = input.trim().split(".");
            if (parts.length !== 3) {
                throw new Error("Invalid JWT format. Expected 3 parts separated by dots.");
            }

            const decodedHeader = JSON.parse(atob(parts[0]));
            const decodedPayload = JSON.parse(atob(parts[1]));

            setHeader(decodedHeader);
            setPayload(decodedPayload);
            setError("");
        } catch (err: any) {
            setError(err.message || "Invalid JWT");
            setHeader(null);
            setPayload(null);
        }
    };

    const copyToClipboard = (text: string, section: string) => {
        navigator.clipboard.writeText(text);
        setCopied(section);
        setTimeout(() => setCopied(null), 2000);
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleString();
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🎫</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>JWT Decoder</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Decode and inspect JSON Web Tokens</p>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="glass-card" style={{ borderRadius: 16, marginBottom: 20, overflow: 'hidden' }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af' }}>Paste your JWT token</span>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                            style={{ width: '100%', height: 120, background: 'transparent', border: 'none', padding: 20, fontFamily: 'monospace', fontSize: 13, color: '#e5e7eb', resize: 'none', outline: 'none', wordBreak: 'break-all' }}
                        />
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <button onClick={decodeJWT} className="btn-primary" style={{ padding: '12px 32px' }}>Decode JWT</button>
                    </div>

                    {error && (
                        <div className="glass-card" style={{ borderRadius: 16, padding: 20, marginBottom: 20, borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                            <p style={{ color: '#ef4444', fontSize: 14 }}>⚠️ {error}</p>
                        </div>
                    )}

                    {header && payload && (
                        <div style={{ display: 'grid', gap: 20 }}>
                            {/* Header */}
                            <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
                                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: '#fb923c' }}>HEADER</span>
                                    <button onClick={() => copyToClipboard(JSON.stringify(header, null, 2), 'header')} style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: copied === 'header' ? '#22c55e' : '#9ca3af' }}>
                                        {copied === 'header' ? <Check style={{ width: 16, height: 16 }} /> : <Copy style={{ width: 16, height: 16 }} />}
                                    </button>
                                </div>
                                <pre style={{ padding: 20, margin: 0, fontFamily: 'monospace', fontSize: 13, color: '#4ade80', overflowX: 'auto' }}>
                                    {JSON.stringify(header, null, 2)}
                                </pre>
                            </div>

                            {/* Payload */}
                            <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
                                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: '#fb923c' }}>PAYLOAD</span>
                                    <button onClick={() => copyToClipboard(JSON.stringify(payload, null, 2), 'payload')} style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: copied === 'payload' ? '#22c55e' : '#9ca3af' }}>
                                        {copied === 'payload' ? <Check style={{ width: 16, height: 16 }} /> : <Copy style={{ width: 16, height: 16 }} />}
                                    </button>
                                </div>
                                <pre style={{ padding: 20, margin: 0, fontFamily: 'monospace', fontSize: 13, color: '#4ade80', overflowX: 'auto' }}>
                                    {JSON.stringify(payload, null, 2)}
                                </pre>
                                {(payload.iat || payload.exp) && (
                                    <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: 13, color: '#9ca3af' }}>
                                        {payload.iat && <p>Issued: {formatDate(payload.iat)}</p>}
                                        {payload.exp && <p>Expires: {formatDate(payload.exp)}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
