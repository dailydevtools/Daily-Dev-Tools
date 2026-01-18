"use client";

import { useState } from "react";
import { Lock, Unlock } from "lucide-react";
import Link from "next/link";

export default function CipherTools() {
    const [input, setInput] = useState("");
    const [shift, setShift] = useState(13); // Default ROT13
    const [output, setOutput] = useState("");

    const process = (s: number) => {
        // Caesar Cipher Logic
        const result = input.replace(/[a-zA-Z]/g, (char) => {
            const base = char <= 'Z' ? 65 : 97;
            // (codepoint - base + shift) % 26 + base
            // Handle negative shift
            return String.fromCharCode(((char.charCodeAt(0) - base + s) % 26 + 26) % 26 + base);
        });
        setOutput(result);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
                        <button onClick={() => { setShift(13); process(13); }} className="btn-secondary" style={{ background: shift === 13 ? 'rgba(251, 146, 60, 0.2)' : undefined, color: shift === 13 ? '#fb923c' : undefined }}>ROT13</button>
                        <button onClick={() => { setShift(3); process(3); }} className="btn-secondary" style={{ background: shift === 3 ? 'rgba(251, 146, 60, 0.2)' : undefined, color: shift === 3 ? '#fb923c' : undefined }}>Caesar (+3)</button>
                        <button onClick={() => { setShift(1); process(1); }} className="btn-secondary" style={{ background: shift === 1 ? 'rgba(251, 146, 60, 0.2)' : undefined, color: shift === 1 ? '#fb923c' : undefined }}>Shift +1</button>
                    </div>

                    <div className="glass-card" style={{ padding: 32, marginBottom: 24 }}>
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Shift Amount (N)</label>
                            <input
                                type="number" value={shift}
                                onChange={e => { setShift(Number(e.target.value)); process(Number(e.target.value)); }}
                                className="input-field"
                                style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Input Text</label>
                                <textarea
                                    value={input}
                                    onChange={e => { setInput(e.target.value); setTimeout(() => process(shift), 0); }}
                                    placeholder="Hello World"
                                    style={{ width: '100%', height: 200, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, color: 'white', resize: 'vertical' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Output Text</label>
                                <textarea
                                    readOnly
                                    value={output}
                                    placeholder="Uryyb Jbeyq"
                                    style={{ width: '100%', height: 200, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, color: '#fb923c', resize: 'vertical' }}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
