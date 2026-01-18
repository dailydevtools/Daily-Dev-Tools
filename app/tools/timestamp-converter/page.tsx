"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function TimestampConverter() {
    const [timestamp, setTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
    const [dateString, setDateString] = useState("");
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        updateFromTimestamp(timestamp);
    }, []);

    const updateFromTimestamp = (ts: number) => {
        setTimestamp(ts);
        // Handle milliseconds vs seconds
        const date = new Date(ts > 10000000000 ? ts : ts * 1000);
        setDateString(date.toISOString());
    };

    const updateFromDate = (iso: string) => {
        setDateString(iso);
        const date = new Date(iso);
        if (!isNaN(date.getTime())) {
            setTimestamp(Math.floor(date.getTime() / 1000));
        }
    };

    const setNow = () => {
        const now = Math.floor(Date.now() / 1000);
        updateFromTimestamp(now);
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const formatParts = (ts: number) => {
        const date = new Date(ts * 1000);
        return {
            utc: date.toUTCString(),
            local: date.toLocaleString(),
            iso: date.toISOString(),
            relative: getRelativeTime(ts)
        };
    };

    const getRelativeTime = (ts: number) => {
        const now = Math.floor(Date.now() / 1000);
        const diff = now - ts;

        if (diff < 60) return `${diff} seconds ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    }

    const parts = formatParts(timestamp);

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>⏰</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>Unix Timestamp Converter</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Convert Unix epoch time to human-readable dates</p>
                        </div>
                    </div>

                    {/* Current Time Banner */}
                    <div className="glass-card" style={{ padding: 24, borderRadius: 16, marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(249,115,22,0.1)', borderColor: 'rgba(249,115,22,0.2)' }}>
                        <div>
                            <div style={{ fontSize: 13, color: '#fb923c', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Current Unix Time</div>
                            <div style={{ fontSize: 32, fontWeight: 'bold', color: 'white', fontFamily: 'monospace' }}>{Math.floor(Date.now() / 1000)}</div>
                        </div>
                        <button
                            onClick={setNow}
                            className="btn-primary"
                            style={{ borderRadius: '50%', width: 48, height: 48, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Reset to Now"
                        >
                            <RefreshCw style={{ width: 20, height: 20 }} />
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
                        <div className="glass-card" style={{ padding: 24, borderRadius: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: '#fb923c' }}>
                                <Clock style={{ width: 18, height: 18 }} />
                                <span style={{ fontWeight: 600 }}>Timestamp (Seconds)</span>
                            </div>
                            <input
                                type="number"
                                value={timestamp}
                                onChange={(e) => updateFromTimestamp(Number(e.target.value))}
                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: 16, borderRadius: 8, color: 'white', fontSize: 20, fontFamily: 'monospace', outline: 'none' }}
                            />
                        </div>

                        <div className="glass-card" style={{ padding: 24, borderRadius: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: '#fb923c' }}>
                                <Calendar style={{ width: 18, height: 18 }} />
                                <span style={{ fontWeight: 600 }}>ISO Date Format</span>
                            </div>
                            <input
                                type="text"
                                value={dateString}
                                onChange={(e) => updateFromDate(e.target.value)}
                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: 16, borderRadius: 8, color: 'white', fontSize: 16, fontFamily: 'monospace', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
                        {[
                            { label: "UTC Date", value: parts.utc, id: "utc" },
                            { label: "Local Date", value: parts.local, id: "local" },
                            { label: "Relative", value: parts.relative, id: "rel" }
                        ].map((item) => (
                            <div key={item.id} className="glass-card" style={{ padding: '16px 20px', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ color: '#9ca3af', minWidth: 100 }}>{item.label}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <code style={{ fontSize: 14, color: '#e5e7eb' }}>{item.value}</code>
                                    <button onClick={() => copyToClipboard(item.value, item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: copied === item.id ? '#4ade80' : '#6b7280' }}>
                                        {copied === item.id ? <Check style={{ width: 16, height: 16 }} /> : <Copy style={{ width: 16, height: 16 }} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
