"use client";

import { useState, useMemo } from "react";
import { Flag } from "lucide-react";
import Link from "next/link";

export default function RegexTester() {
    const [regex, setRegex] = useState("");
    const [flags, setFlags] = useState("gm");
    const [text, setText] = useState("");

    const matches = useMemo(() => {
        if (!regex) return [];
        try {
            const re = new RegExp(regex, flags);
            const results = [];
            let match;
            // Prevent infinite loops with zero-length matches
            if (re.global) {
                while ((match = re.exec(text)) !== null) {
                    if (match.index === re.lastIndex) {
                        re.lastIndex++;
                    }
                    results.push(match);
                }
            } else {
                match = re.exec(text);
                if (match) results.push(match);
            }
            return results;
        } catch (e) {
            return [];
        }
    }, [regex, flags, text]);

    const toggleFlag = (flag: string) => {
        setFlags(prev =>
            prev.includes(flag) ? prev.replace(flag, "") : prev + flag
        );
    };

    const highlightedText = useMemo(() => {
        if (!regex || matches.length === 0) return text;

        try {
            let lastIndex = 0;
            const parts = [];

            matches.forEach((match, i) => {
                // Add text before match
                if (match.index > lastIndex) {
                    parts.push(text.slice(lastIndex, match.index));
                }
                // Add matched text
                parts.push(
                    <span key={i} style={{ background: 'rgba(249, 115, 22, 0.3)', borderRadius: 2 }}>
                        {match[0]}
                    </span>
                );
                lastIndex = match.index + match[0].length;
            });

            // Add remaining text
            if (lastIndex < text.length) {
                parts.push(text.slice(lastIndex));
            }

            return parts;
        } catch (e) {
            return text;
        }
    }, [text, matches, regex]);

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>.*</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>Regex Tester</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Test and debug regular expressions in real-time</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                        {/* Left Column: Inputs */}
                        <div>
                            {/* Regex Input */}
                            <div className="glass-card" style={{ padding: 20, borderRadius: 16, marginBottom: 20 }}>
                                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#fb923c', marginBottom: 12 }}>Expression</label>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '0 12px' }}>
                                    <span style={{ color: '#6b7280', fontSize: 16 }}>/</span>
                                    <input
                                        type="text"
                                        value={regex}
                                        onChange={(e) => setRegex(e.target.value)}
                                        placeholder="Capture group (abc)..."
                                        style={{ flex: 1, background: 'transparent', border: 'none', padding: '12px 4px', color: 'white', fontSize: 16, outline: 'none', fontFamily: 'monospace' }}
                                    />
                                    <span style={{ color: '#6b7280', fontSize: 16 }}>/{flags}</span>
                                </div>

                                {/* Flags */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                                    {['g', 'i', 'm', 's', 'u', 'y'].map(flag => (
                                        <button
                                            key={flag}
                                            onClick={() => toggleFlag(flag)}
                                            className={flags.includes(flag) ? "btn-primary" : "btn-secondary"}
                                            style={{ padding: '4px 12px', fontSize: 12, borderRadius: 100 }}
                                        >
                                            {flag}
                                        </button>
                                    ))}
                                </div>
                                <div style={{ marginTop: 12, color: '#9ca3af', fontSize: 12 }}>
                                    <p>g: global, i: ignore case, m: multiline</p>
                                </div>
                            </div>

                            {/* Test String Input */}
                            <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden', height: 400, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(255,255,255,0.02)' }}>
                                    <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af' }}>Test String</span>
                                </div>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Paste your test string here..."
                                    style={{ flex: 1, width: '100%', background: 'transparent', border: 'none', padding: 20, fontFamily: 'monospace', fontSize: 14, color: '#e5e7eb', resize: 'none', outline: 'none' }}
                                />
                            </div>
                        </div>

                        {/* Right Column: Output */}
                        <div>
                            {/* Match Highlight View */}
                            <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 20, height: 300, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 14, fontWeight: 500, color: '#fb923c' }}>Match Highlights</span>
                                    <span style={{ fontSize: 12, color: '#9ca3af' }}>{matches.length} matches</span>
                                </div>
                                <div style={{ padding: 20, fontFamily: 'monospace', fontSize: 14, color: '#e5e7eb', whiteSpace: 'pre-wrap', overflowY: 'auto', flex: 1 }}>
                                    {text ? highlightedText : <span style={{ color: '#6b7280' }}>Matches will be highlighted here...</span>}
                                </div>
                            </div>

                            {/* Match Details */}
                            <div className="glass-card" style={{ borderRadius: 16, overflow: 'hidden', height: 320, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(255,255,255,0.02)' }}>
                                    <span style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af' }}>Match Information</span>
                                </div>
                                <div style={{ padding: 20, overflowY: 'auto', flex: 1 }}>
                                    {matches.length > 0 ? (
                                        matches.map((match, i) => (
                                            <div key={i} style={{ marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 12 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                    <span style={{ color: '#fb923c', fontWeight: 600, fontSize: 13 }}>Match {i + 1}</span>
                                                    <span style={{ color: '#6b7280', fontSize: 12 }}>Index: {match.index}</span>
                                                </div>
                                                <div style={{ color: 'white', fontSize: 14, fontFamily: 'monospace' }}>"{match[0]}"</div>
                                                {match.length > 1 && (
                                                    <div style={{ marginTop: 8, paddingLeft: 8, borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
                                                        {Array.from(match).slice(1).map((group, gi) => (
                                                            <div key={gi} style={{ fontSize: 12, color: '#9ca3af' }}>
                                                                Group {gi + 1}: <span style={{ color: '#e5e7eb', fontFamily: 'monospace' }}>"{group}"</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ color: '#6b7280', fontSize: 13, textAlign: 'center', marginTop: 40 }}>
                                            No matches found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
