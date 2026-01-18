"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Type } from "lucide-react";
import Link from "next/link";

export default function CaseConverter() {
    const [text, setText] = useState("Hello World Example Text");
    const [copied, setCopied] = useState<string | null>(null);

    const convert = (type: string) => {
        if (!text) return "";

        // Normalize to words first
        const words = text
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase
            .replace(/[_-]/g, ' ') // Split snake/kebab
            .split(/\s+/)
            .filter(w => w.length > 0)
            .map(w => w.toLowerCase());

        if (words.length === 0) return "";

        switch (type) {
            case 'camel':
                return words[0] + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
            case 'pascal':
                return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
            case 'snake':
                return words.join('_');
            case 'kebab':
                return words.join('-');
            case 'constant':
                return words.join('_').toUpperCase();
            case 'dot':
                return words.join('.');
            case 'path':
                return words.join('/');
            case 'title':
                return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            case 'sentence':
                return words.map((w, i) => i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w).join(' ');
            case 'lower':
                return words.join(' ');
            case 'upper':
                return words.join(' ').toUpperCase();
            default:
                return words.join(' ');
        }
    };

    const copyToClipboard = (val: string, type: string) => {
        navigator.clipboard.writeText(val);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const cases = [
        { id: 'camel', label: 'camelCase', example: 'helloWorld' },
        { id: 'pascal', label: 'PascalCase', example: 'HelloWorld' },
        { id: 'snake', label: 'snake_case', example: 'hello_world' },
        { id: 'kebab', label: 'kebab-case', example: 'hello-world' },
        { id: 'constant', label: 'CONSTANT_CASE', example: 'HELLO_WORLD' },
        { id: 'dot', label: 'dot.case', example: 'hello.world' },
        { id: 'path', label: 'path/case', example: 'hello/world' },
        { id: 'title', label: 'Title Case', example: 'Hello World' },
        { id: 'sentence', label: 'Sentence case', example: 'Hello world' },
        { id: 'lower', label: 'lowercase', example: 'hello world' },
        { id: 'upper', label: 'UPPERCASE', example: 'HELLO WORLD' },
    ];

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>Aa</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>Case Converter</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Convert code variables between different cases</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: 32 }}>

                        {/* Input */}
                        <div className="glass-card" style={{ padding: 24, borderRadius: 24, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 16, marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                                <label style={{ color: '#fb923c', fontWeight: 600 }}>Input Text</label>
                                <button onClick={() => setText("")} style={{ background: 'transparent', border: 'none', color: '#6b7280', fontSize: 12, cursor: 'pointer' }}>Clear</button>
                            </div>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Type or paste your text here..."
                                style={{ flex: 1, minHeight: 400, background: 'transparent', border: 'none', resize: 'none', outline: 'none', fontSize: 16, color: '#e5e7eb', lineHeight: 1.6 }}
                            />
                        </div>

                        {/* Output List */}
                        <div className="glass-card" style={{ padding: 24, borderRadius: 24, display: 'flex', flexDirection: 'column', gap: 16, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            <h3 style={{ color: 'white', fontWeight: 600, marginBottom: 8 }}>Conversions</h3>
                            {cases.map((c) => {
                                const converted = convert(c.id);
                                return (
                                    <div key={c.id} style={{ background: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 12 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <span style={{ color: '#9ca3af', fontSize: 13 }}>{c.label}</span>
                                            <button onClick={() => copyToClipboard(converted, c.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: copied === c.id ? '#4ade80' : '#6b7280' }}>
                                                {copied === c.id ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
                                            </button>
                                        </div>
                                        <div style={{ color: 'white', fontFamily: 'monospace', fontSize: 14, wordBreak: 'break-all' }}>
                                            {converted || <span style={{ opacity: 0.3 }}>{c.example}</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
