"use client";

import { useState } from "react";
import { RefreshCw, Copy } from "lucide-react";
import Link from "next/link";

export default function MacGenerator() {
    const [macs, setMacs] = useState<string[]>([]);
    const [count, setCount] = useState(5);
    const [format, setFormat] = useState("Colon");
    const [uppercase, setUppercase] = useState(true);

    const generate = () => {
        const newMacs = [];
        for (let i = 0; i < count; i++) {
            const arr = new Uint8Array(6);
            crypto.getRandomValues(arr);
            // Set unicast locally administered (x2/x6/xA/xE)
            arr[0] = (arr[0] & 0xfc) | 0x02;

            let m = Array.from(arr).map(b => b.toString(16).padStart(2, '0'));

            if (uppercase) m = m.map(s => s.toUpperCase());

            if (format === "Colon") newMacs.push(m.join(':'));
            else if (format === "Dash") newMacs.push(m.join('-'));
            else if (format === "Dot") newMacs.push(`${m[0]}${m[1]}.${m[2]}${m[3]}.${m[4]}${m[5]}`);
            else newMacs.push(m.join(''));
        }
        setMacs(newMacs);
    };

    useState(() => { generate(); });

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Format</label>
                                <select value={format} onChange={e => setFormat(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, background: '#111', border: '1px solid #333', color: 'white' }}>
                                    <option value="Colon">MM:MM:MM:SS:SS:SS</option>
                                    <option value="Dash">MM-MM-MM-SS-SS-SS</option>
                                    <option value="Dot">MMMM.MMSS.SSSS</option>
                                    <option value="None">MMMMMMSSSSSS</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Quantity</label>
                                <input type="number" min="1" max="50" value={count} onChange={e => setCount(Number(e.target.value))} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                            </div>
                        </div>

                        <div style={{ marginBottom: 32 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'white', cursor: 'pointer' }}>
                                <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
                                Uppercase
                            </label>
                        </div>

                        <button onClick={generate} className="btn-primary" style={{ width: '100%', padding: 16, marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                            <RefreshCw size={20} /> Generate
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {macs.map((mac, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                                    <span style={{ fontFamily: 'monospace', color: '#fb923c', fontSize: 16 }}>{mac}</span>
                                    <button onClick={() => navigator.clipboard.writeText(mac)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                                        <Copy size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
