"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function HmacGenerator() {
    const [message, setMessage] = useState("");
    const [secret, setSecret] = useState("");
    const [algo, setAlgo] = useState("SHA-256");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const generate = async () => {
        setError("");
        try {
            if (!message || !secret) return;

            const enc = new TextEncoder();
            const keyData = enc.encode(secret);
            const msgData = enc.encode(message);

            const key = await window.crypto.subtle.importKey(
                "raw", keyData, { name: "HMAC", hash: algo }, false, ["sign"]
            );

            const signature = await window.crypto.subtle.sign("HMAC", key, msgData);

            // Convert to hex
            const hashArray = Array.from(new Uint8Array(signature));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            setOutput(hashHex);

        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Message</label>
                            <textarea
                                value={message} onChange={e => setMessage(e.target.value)}
                                placeholder="Input text..."
                                className="input-field"
                                style={{ width: '100%', height: 100, padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px', gap: 24, marginBottom: 24 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Secret Key</label>
                                <input
                                    type="text" value={secret} onChange={e => setSecret(e.target.value)}
                                    placeholder="Secret..."
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Algorithm</label>
                                <select
                                    value={algo} onChange={e => setAlgo(e.target.value)}
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: '#111', border: '1px solid #333', color: 'white' }}
                                >
                                    <option value="SHA-1">SHA-1</option>
                                    <option value="SHA-256">SHA-256</option>
                                    <option value="SHA-384">SHA-384</option>
                                    <option value="SHA-512">SHA-512</option>
                                </select>
                            </div>
                        </div>

                        <button onClick={generate} className="btn-primary" style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                            <Lock size={18} /> Generate HMAC
                        </button>

                        {output && (
                            <div style={{ marginTop: 24 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>HMAC Output (Hex)</label>
                                <div style={{ position: 'relative' }}>
                                    <textarea
                                        readOnly
                                        value={output}
                                        style={{ width: '100%', height: 80, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: 12, padding: 16, color: '#22c55e', fontSize: 14, fontFamily: 'monospace' }}
                                    />
                                    <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary" style={{ position: 'absolute', top: 12, right: 12 }}>Copy</button>
                                </div>
                            </div>
                        )}
                        {error && <div style={{ color: '#ef4444', marginTop: 12 }}>{error}</div>}
                    </div>

                </div>
            </div>
        </div>
    );
}
