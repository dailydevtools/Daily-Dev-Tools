"use client";

import { useState } from "react";
import { RefreshCw, Copy } from "lucide-react";
import Link from "next/link";

export default function AsciiConverter() {
    const [text, setText] = useState("Hello");
    const [ascii, setAscii] = useState("72 101 108 108 111");

    const handleText = (val: string) => {
        setText(val);
        setAscii(val.split('').map(c => c.charCodeAt(0)).join(' '));
    };

    const handleAscii = (val: string) => {
        setAscii(val);
        const nums = val.trim().split(/\s+/).map(n => parseInt(n));
        const res = nums.map(n => isNaN(n) ? '' : String.fromCharCode(n)).join('');
        setText(res);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>

                        <div>
                            <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Text</label>
                            <textarea
                                value={text} onChange={e => handleText(e.target.value)}
                                className="input-field"
                                style={{ width: '100%', height: 200, padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>ASCII Decimal</label>
                            <textarea
                                value={ascii} onChange={e => handleAscii(e.target.value)}
                                className="input-field"
                                style={{ width: '100%', height: 200, padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fb923c', fontFamily: 'monospace', resize: 'vertical' }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
