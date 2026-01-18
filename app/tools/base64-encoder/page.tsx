"use client";

import { useState } from "react";
import { Copy, Check, ArrowRightLeft } from "lucide-react";
import Link from "next/link";

export default function Base64Encoder() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const handleConvert = () => {
        try {
            if (mode === "encode") {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
            setError("");
        } catch (err) {
            setError("Invalid input for " + (mode === "encode" ? "encoding" : "decoding"));
            setOutput("");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const swapMode = () => {
        setMode(mode === "encode" ? "decode" : "encode");
        setInput(output);
        setOutput("");
        setError("");
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            {/* Navbar removed */}

            <div style={{ position: 'relative', zIndex: 10, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🔐</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>Base64 Encoder/Decoder</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Encode and decode Base64 strings instantly</p>
                        </div>
                    </div>

                    {/* Mode Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                        <button
                            onClick={() => setMode("encode")}
                            className={mode === "encode" ? "btn-primary" : "btn-secondary"}
                            style={{ padding: '10px 24px' }}
                        >
                            Encode
                        </button>
                        <button onClick={swapMode} className="btn-secondary" style={{ padding: '10px 12px' }}>
                            <ArrowRightLeft style={{ width: 16, height: 16 }} />
                        </button>
                        <button
                            onClick={() => setMode("decode")}
                            className={mode === "decode" ? "btn-primary" : "btn-secondary"}
                            style={{ padding: '10px 24px' }}
                        >
                            Decode
                        </button>
                    </div>

                    {/* Input */}
                    <div className="glass-card" style={{ borderRadius: 16, marginBottom: 20, overflow: 'hidden' }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af' }}>{mode === "encode" ? "Text to Encode" : "Base64 to Decode"}</span>
                            <span style={{ fontSize: 12, color: '#6b7280' }}>{input.length} chars</span>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
                            style={{ width: '100%', height: 180, background: 'transparent', border: 'none', padding: 20, fontFamily: 'monospace', fontSize: 14, color: '#e5e7eb', resize: 'none', outline: 'none' }}
                        />
                    </div>

                    {/* Convert Button */}
                    <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        <button onClick={handleConvert} className="btn-primary" style={{ padding: '12px 32px' }}>
                            {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
                        </button>
                    </div>

                    {/* Output */}
                    <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af' }}>{mode === "encode" ? "Base64 Output" : "Decoded Text"}</span>
                            {output && (
                                <button onClick={copyToClipboard} style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: copied ? '#22c55e' : '#9ca3af' }}>
                                    {copied ? <Check style={{ width: 16, height: 16 }} /> : <Copy style={{ width: 16, height: 16 }} />}
                                </button>
                            )}
                        </div>
                        <textarea
                            value={error || output}
                            readOnly
                            placeholder="Result will appear here..."
                            style={{ width: '100%', height: 180, background: 'transparent', border: 'none', padding: 20, fontFamily: 'monospace', fontSize: 14, color: error ? '#ef4444' : '#4ade80', resize: 'none', outline: 'none' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
