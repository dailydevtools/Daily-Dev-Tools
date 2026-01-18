"use client";

import { useState } from "react";
import { Copy, Check, Download, Upload, Trash2 } from "lucide-react";
import Link from "next/link";

export default function JSONFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [indentSize, setIndentSize] = useState(2);

    const formatJSON = () => {
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, indentSize);
            setOutput(formatted);
            setError("");
        } catch (err: any) {
            setError(err.message);
            setOutput("");
        }
    };

    const minifyJSON = () => {
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            setError("");
        } catch (err: any) {
            setError(err.message);
            setOutput("");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadJSON = () => {
        const blob = new Blob([output], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "formatted.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setInput(event.target?.result as string);
            };
            reader.readAsText(file);
        }
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
        setError("");
    };

    const sampleJSON = () => {
        setInput(JSON.stringify({
            "name": "John Doe",
            "email": "john@example.com",
            "age": 30,
            "address": {
                "city": "New York",
                "zip": "10001"
            },
            "hobbies": ["coding", "gaming", "reading"]
        }));
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Background Orbs */}
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            {/* Main Content */}
            <div style={{ position: 'relative', zIndex: 10, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{
                            width: 56,
                            height: 56,
                            borderRadius: 16,
                            background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'black'
                        }}>
                            {"{ }"}
                        </div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>JSON Formatter</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Format, validate & beautify JSON data</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                        <button onClick={formatJSON} className="btn-primary" style={{ padding: '10px 20px' }}>
                            Format JSON
                        </button>
                        <button onClick={minifyJSON} className="btn-secondary" style={{ padding: '10px 20px' }}>
                            Minify
                        </button>

                        <div className="glass" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label style={{ fontSize: 13, color: '#9ca3af' }}>Indent:</label>
                            <select
                                value={indentSize}
                                onChange={(e) => setIndentSize(Number(e.target.value))}
                                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: 13, cursor: 'pointer' }}
                            >
                                <option value={2} style={{ background: '#1a1a1a' }}>2 spaces</option>
                                <option value={4} style={{ background: '#1a1a1a' }}>4 spaces</option>
                            </select>
                        </div>

                        <label className="btn-secondary" style={{ padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Upload style={{ width: 16, height: 16 }} />
                            Upload
                            <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
                        </label>

                        <button onClick={sampleJSON} className="btn-secondary" style={{ padding: '10px 20px' }}>
                            Sample
                        </button>

                        <button
                            onClick={clearAll}
                            className="btn-secondary"
                            style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                        >
                            <Trash2 style={{ width: 16, height: 16 }} />
                            Clear
                        </button>
                    </div>

                    {/* Editor Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }}>
                        {/* Input */}
                        <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
                            <div style={{
                                padding: '16px 20px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
                                    </div>
                                    <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af' }}>Input</span>
                                </div>
                                <span style={{ fontSize: 12, color: '#6b7280' }}>{input.length} chars</span>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder='Paste your JSON here...'
                                style={{
                                    width: '100%',
                                    height: 450,
                                    background: 'transparent',
                                    border: 'none',
                                    padding: 20,
                                    fontFamily: 'monospace',
                                    fontSize: 13,
                                    color: '#e5e7eb',
                                    resize: 'none',
                                    outline: 'none'
                                }}
                                spellCheck={false}
                            />
                        </div>

                        {/* Output */}
                        <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
                            <div style={{
                                padding: '16px 20px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
                                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
                                    </div>
                                    <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af' }}>Output</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    {output && (
                                        <>
                                            <button
                                                onClick={downloadJSON}
                                                style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#9ca3af', borderRadius: 8 }}
                                                title="Download"
                                            >
                                                <Download style={{ width: 16, height: 16 }} />
                                            </button>
                                            <button
                                                onClick={copyToClipboard}
                                                style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: copied ? '#22c55e' : '#9ca3af', borderRadius: 8 }}
                                                title="Copy"
                                            >
                                                {copied ? <Check style={{ width: 16, height: 16 }} /> : <Copy style={{ width: 16, height: 16 }} />}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <textarea
                                    value={output}
                                    readOnly
                                    placeholder="Formatted JSON will appear here..."
                                    style={{
                                        width: '100%',
                                        height: 450,
                                        background: 'transparent',
                                        border: 'none',
                                        padding: 20,
                                        fontFamily: 'monospace',
                                        fontSize: 13,
                                        color: '#4ade80',
                                        resize: 'none',
                                        outline: 'none'
                                    }}
                                    spellCheck={false}
                                />
                                {error && (
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(0, 0, 0, 0.9)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 24
                                    }}>
                                        <div className="glass-card" style={{ padding: 32, borderRadius: 16, maxWidth: 400, textAlign: 'center' }}>
                                            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
                                            <h4 style={{ fontWeight: 600, color: '#ef4444', fontSize: 18, marginBottom: 8 }}>Invalid JSON</h4>
                                            <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{error}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
