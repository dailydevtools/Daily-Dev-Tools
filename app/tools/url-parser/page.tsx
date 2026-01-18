"use client";

import { useState, useEffect } from "react";
import { Link as LinkIcon, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function UrlParser() {
    const [input, setInput] = useState("");
    const [parsed, setParsed] = useState<any>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!input) {
            setParsed(null);
            setError("");
            return;
        }
        try {
            const url = new URL(input);
            const params: Record<string, string> = {};
            url.searchParams.forEach((v, k) => params[k] = v);

            setParsed({
                protocol: url.protocol,
                host: url.host,
                hostname: url.hostname,
                port: url.port,
                pathname: url.pathname,
                search: url.search,
                hash: url.hash,
                origin: url.origin,
                params
            });
            setError("");
        } catch (e) {
            setParsed(null);
            setError("Invalid URL");
        }
    }, [input]);

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ marginBottom: 24 }}>
                            <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Enter URL</label>
                            <input
                                type="text" value={input} onChange={e => setInput(e.target.value)}
                                placeholder="https://example.com/path?query=123"
                                className="input-field"
                                style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                            />
                        </div>

                        {error && <div style={{ color: '#ef4444', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><AlertCircle size={16} /> {error}</div>}

                        {parsed && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                {Object.entries(parsed).map(([key, val]) => {
                                    if (key === 'params') return null;
                                    return (
                                        <div key={key}>
                                            <div style={{ fontSize: 13, color: '#9ca3af', textTransform: 'capitalize' }}>{key}</div>
                                            <div style={{ color: 'white', wordBreak: 'break-all', padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 6, marginTop: 4 }}>{String(val) || '-'}</div>
                                        </div>
                                    );
                                })}

                                {Object.keys(parsed.params).length > 0 && (
                                    <div style={{ gridColumn: '1 / -1', marginTop: 16 }}>
                                        <div style={{ fontSize: 13, color: '#9ca3af' }}>Query Parameters</div>
                                        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {Object.entries(parsed.params).map(([k, v]) => (
                                                <div key={k} style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 6, padding: 8 }}>
                                                    <div style={{ width: 120, fontWeight: 600, color: '#fb923c' }}>{k}</div>
                                                    <div style={{ flex: 1, color: 'white', wordBreak: 'break-all' }}>{String(v)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
