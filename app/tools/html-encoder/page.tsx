"use client";

import { useState } from "react";
import { Code } from "lucide-react";
import Link from "next/link";

export default function HtmlEncoder() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");

    const process = () => {
        if (mode === "encode") {
            setOutput(
                input.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;")
            );
        } else {
            const txt = document.createElement("textarea");
            txt.innerHTML = input;
            setOutput(txt.value);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 12, display: 'flex', gap: 4 }}>
                            <button onClick={() => { setMode("encode"); setInput(""); setOutput(""); }} style={{ padding: '8px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', background: mode === 'encode' ? '#fb923c' : 'transparent', color: mode === 'encode' ? 'black' : '#9ca3af', fontWeight: 500 }}>Encode</button>
                            <button onClick={() => { setMode("decode"); setInput(""); setOutput(""); }} style={{ padding: '8px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', background: mode === 'decode' ? '#fb923c' : 'transparent', color: mode === 'decode' ? 'black' : '#9ca3af', fontWeight: 500 }}>Decode</button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                            <textarea
                                value={input} onChange={e => setInput(e.target.value)}
                                placeholder={mode === 'encode' ? '<div class="foo">Bar</div>' : '&lt;div class=&quot;foo&quot;&gt;Bar&lt;/div&gt;'}
                                style={{ width: '100%', height: 200, background: 'transparent', border: 'none', padding: 20, color: 'white', fontFamily: 'monospace', resize: 'vertical', outline: 'none' }}
                            />
                        </div>

                        <button onClick={process} className="btn-primary" style={{ justifySelf: 'center', padding: '12px 32px' }}>
                            {mode === 'encode' ? 'Encode HTML' : 'Decode HTML'}
                        </button>

                        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                            <textarea
                                readOnly
                                value={output}
                                placeholder="Result will appear here..."
                                style={{ width: '100%', height: 200, background: 'transparent', border: 'none', padding: 20, color: 'white', fontFamily: 'monospace', resize: 'vertical', outline: 'none' }}
                            />
                            <button onClick={() => navigator.clipboard.writeText(output)} style={{ position: 'absolute', top: 12, right: 12 }} className="btn-secondary">Copy</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
