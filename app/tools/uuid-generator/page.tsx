"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, CopyCheck } from "lucide-react";
import Link from "next/link";

export default function UuidGenerator() {
    const [uuids, setUuids] = useState<string[]>([]);
    const [amount, setAmount] = useState(1);
    const [copied, setCopied] = useState(false);
    const [lastGenerated, setLastGenerated] = useState<string>("");

    const generateUuids = () => {
        // Basic implementation since we don't have the uuid package installed yet
        const generateOne = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        const newUuids = [];
        for (let i = 0; i < amount; i++) {
            newUuids.push(generateOne());
        }
        setUuids(newUuids);
        setLastGenerated(new Date().toLocaleTimeString());
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const copyAll = () => {
        copyToClipboard(uuids.join('\n'));
    }

    // Generate on first load
    if (uuids.length === 0) {
        generateUuids();
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            {/* Navbar removed */}

            <div style={{ position: 'relative', zIndex: 10, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🆔</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>UUID Generator</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Generate random UUIDs (Version 4)</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, background: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ color: '#9ca3af', fontSize: 14 }}>Generate:</span>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '8px 12px', borderRadius: 8, width: 80, fontSize: 14 }}
                            />
                        </div>
                        <button onClick={generateUuids} className="btn-primary" style={{ padding: '8px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <RefreshCw style={{ width: 16, height: 16 }} /> Generate
                        </button>
                        <button onClick={copyAll} className="btn-secondary" style={{ padding: '8px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            {copied ? <Check style={{ width: 16, height: 16, color: '#22c55e' }} /> : <CopyCheck style={{ width: 16, height: 16 }} />}
                            Copy All
                        </button>
                    </div>

                    <div style={{ display: 'grid', gap: 12 }}>
                        {uuids.map((uuid, i) => (
                            <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderRadius: 12 }}>
                                <code style={{ fontSize: 16, color: '#4ade80', fontFamily: 'monospace' }}>{uuid}</code>
                                <button
                                    onClick={() => copyToClipboard(uuid)}
                                    className="hover:bg-white/10"
                                    style={{ padding: 8, borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#9ca3af', transition: 'all 0.2s' }}
                                    title="Copy UUID"
                                >
                                    <Copy style={{ width: 16, height: 16 }} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 32, color: '#6b7280', fontSize: 13 }}>
                        Generated locally at {lastGenerated} • Version 4 UUIDs
                    </div>

                </div>
            </div>
        </div>
    );
}
