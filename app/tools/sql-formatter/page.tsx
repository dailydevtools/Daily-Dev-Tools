"use client";

import { useState } from "react";
import { Copy, Check, Trash2 } from "lucide-react";
import Link from "next/link";
// In a real app we would use 'sql-formatter' library.
// Here we will use a basic regex based formatter for the demo.

export default function SqlFormatter() {
    const [input, setInput] = useState("SELECT * FROM users WHERE id = 1 AND active = true ORDER BY created_at DESC;");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);

    const formatSql = () => {
        // Basic SQL Formatter (Regex based)
        let formatted = input
            .replace(/\s+/g, ' ') // Collapse whitespace
            .replace(/\s*([,;])\s*/g, '$1\n') // Newline after comma/semicolon
            .replace(/\s*(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|LIMIT|INSERT INTO|UPDATE|DELETE FROM|VALUES|SET)\s*/gi, '\n$1 ') // Keywords on new lines
            .replace(/^\s+/, "") // Trim start
            .trim();

        // Add simple indentation
        const lines = formatted.split('\n');
        let indent = 0;
        formatted = lines.map(line => {
            if (line.match(/^\)/)) indent = Math.max(0, indent - 1);
            const prefix = "  ".repeat(indent);
            if (line.match(/\($/)) indent++;
            return prefix + line;
        }).join('\n');

        setOutput(formatted);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            {/* Navbar removed */}

            <div style={{ position: 'relative', zIndex: 10, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🗄️</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>SQL Formatter</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Format and beautify SQL queries</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                        <button onClick={formatSql} className="btn-primary" style={{ padding: '10px 24px' }}>
                            Format SQL
                        </button>
                        <button onClick={() => { setInput(""); setOutput(""); }} className="btn-secondary" style={{ padding: '10px 24px', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Trash2 style={{ width: 16, height: 16 }} /> Clear
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
                        <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af' }}>Raw SQL</span>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="PASTE YOUR SQL HERE..."
                                style={{ flex: 1, height: 400, background: 'transparent', border: 'none', padding: 20, fontFamily: 'monospace', fontSize: 13, color: '#e5e7eb', resize: 'none', outline: 'none' }}
                            />
                        </div>

                        <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 14, fontWeight: 500, color: '#fb923c' }}>Formatted SQL</span>
                                <button onClick={copyToClipboard} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: copied ? '#22c55e' : '#9ca3af' }}>
                                    {copied ? <Check style={{ width: 16, height: 16 }} /> : <Copy style={{ width: 16, height: 16 }} />}
                                </button>
                            </div>
                            <textarea
                                value={output}
                                readOnly
                                placeholder="Result will appear here..."
                                style={{ flex: 1, height: 400, background: 'transparent', border: 'none', padding: 20, fontFamily: 'monospace', fontSize: 13, color: '#4ade80', resize: 'none', outline: 'none' }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
