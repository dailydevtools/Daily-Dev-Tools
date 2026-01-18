"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Link from "next/link";

export default function HashGenerator() {
    const [input, setInput] = useState("");
    const [hashes, setHashes] = useState<Record<string, string>>({});
    const [copied, setCopied] = useState<string | null>(null);

    const algorithms = [
        { name: "SHA-1", algo: "SHA-1" },
        { name: "SHA-256", algo: "SHA-256" },
        { name: "SHA-384", algo: "SHA-384" },
        { name: "SHA-512", algo: "SHA-512" },
    ];

    const generateHashes = async (text: string) => {
        setInput(text);
        if (!text) {
            setHashes({});
            return;
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        const newHashes: Record<string, string> = {};

        for (const alg of algorithms) {
            try {
                const hashBuffer = await crypto.subtle.digest(alg.algo, data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                newHashes[alg.algo] = hashHex;
            } catch (e) {
                newHashes[alg.algo] = "Error";
            }
        }

        setHashes(newHashes);
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>#</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>Hash Generator</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Generate secure SHA-1, SHA-256 hashes instanty</p>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: 24, borderRadius: 16, marginBottom: 32 }}>
                        <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#fb923c', marginBottom: 12 }}>Input Text</label>
                        <textarea
                            value={input}
                            onChange={(e) => generateHashes(e.target.value)}
                            placeholder="Enter text to hash..."
                            style={{ width: '100%', height: 100, background: 'rgba(0,0,0,0.2)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', padding: 16, fontFamily: 'monospace', fontSize: 14, color: '#e5e7eb', resize: 'none', outline: 'none' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gap: 16 }}>
                        {algorithms.map((algo) => {
                            const hash = hashes[algo.algo];
                            return (
                                <div key={algo.algo} className="glass-card" style={{ borderRadius: 12, overflow: 'hidden' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(255,255,255,0.02)' }}>
                                        <span style={{ fontWeight: 600, color: 'white' }}>{algo.name}</span>
                                        <button
                                            onClick={() => copyToClipboard(hash, algo.algo)}
                                            disabled={!input}
                                            style={{ padding: 8, background: 'transparent', border: 'none', cursor: input ? 'pointer' : 'not-allowed', color: copied === algo.algo ? '#22c55e' : '#9ca3af', opacity: input ? 1 : 0.5 }}
                                        >
                                            {copied === algo.algo ? <Check style={{ width: 16, height: 16 }} /> : <Copy style={{ width: 16, height: 16 }} />}
                                        </button>
                                    </div>
                                    <div style={{ padding: '16px 20px' }}>
                                        <code style={{ fontSize: 13, color: input ? '#4ade80' : '#6b7280', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                            {input ? hash : "Waiting for input..."}
                                        </code>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
