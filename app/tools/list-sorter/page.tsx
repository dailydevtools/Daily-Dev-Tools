"use client";

import { useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, Shuffle, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ListSorter() {
    const [input, setInput] = useState("");

    const process = (action: string) => {
        let lines = input.split('\n');
        // Filter empty? Maybe not, preserve structure.

        switch (action) {
            case 'az': lines.sort(); break;
            case 'za': lines.sort().reverse(); break;
            case 'reverse': lines.reverse(); break;
            case 'random': lines.sort(() => Math.random() - 0.5); break;
            case 'length': lines.sort((a, b) => a.length - b.length); break;
            case 'unique': lines = Array.from(new Set(lines)); break;
            case 'trim': lines = lines.map(l => l.trim()).filter(l => l); break;
        }
        setInput(lines.join('\n'));
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: 16, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 12, flexWrap: 'wrap', background: 'rgba(0,0,0,0.2)' }}>
                            <button onClick={() => process('az')} className="btn-secondary" style={{ fontSize: 13, gap: 6 }}><ArrowDownAZ size={16} /> A-Z</button>
                            <button onClick={() => process('za')} className="btn-secondary" style={{ fontSize: 13, gap: 6 }}><ArrowUpAZ size={16} /> Z-A</button>
                            <button onClick={() => process('reverse')} className="btn-secondary" style={{ fontSize: 13 }}>Reverse</button>
                            <button onClick={() => process('random')} className="btn-secondary" style={{ fontSize: 13, gap: 6 }}><Shuffle size={16} /> Shuffle</button>
                            <button onClick={() => process('length')} className="btn-secondary" style={{ fontSize: 13 }}>Length</button>
                            <button onClick={() => process('unique')} className="btn-secondary" style={{ fontSize: 13, color: '#fb923c' }}>Remove Duplicates</button>
                            <button onClick={() => process('trim')} className="btn-secondary" style={{ fontSize: 13 }}>Trim Empty</button>
                            <div style={{ flex: 1 }} />
                            <button onClick={() => setInput("")} className="btn-secondary" style={{ fontSize: 13, color: '#ef4444' }}><Trash2 size={16} /></button>
                        </div>

                        <textarea
                            value={input} onChange={e => setInput(e.target.value)}
                            placeholder="Enter your list here...
Banana
Apple
Orange
Apple"
                            style={{ width: '100%', height: 500, background: 'transparent', border: 'none', padding: 20, color: 'white', fontFamily: 'monospace', resize: 'vertical', outline: 'none', fontSize: 14, lineHeight: 1.5 }}
                        />

                        <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#6b7280', fontSize: 12, textAlign: 'right' }}>
                            Lines: {input.split('\n').length} | Characters: {input.length}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
