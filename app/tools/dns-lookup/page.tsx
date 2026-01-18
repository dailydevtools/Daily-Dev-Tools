"use client";

import { useState } from "react";
import { Search, Globe, Server } from "lucide-react";
import Link from "next/link";

const RECORD_TYPES = ["A", "AAAA", "CNAME", "MX", "NS", "TXT", "PTR", "SRV", "SOA"];

export default function DNSLookup() {
    const [domain, setDomain] = useState("");
    const [type, setType] = useState("A");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const lookup = async () => {
        if (!domain) return;
        setLoading(true);
        setError("");
        setData(null);

        try {
            const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`, {
                headers: { 'accept': 'application/dns-json' }
            });
            if (!res.ok) throw new Error("Failed to fetch DNS");
            const json = await res.json();
            setData(json);
        } catch (e: any) {
            setError(e.message || "Error fetching DNS data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 30, display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
                        <Globe size={20} color="#9ca3af" />
                        <input
                            value={domain}
                            onChange={e => setDomain(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && lookup()}
                            placeholder="example.com"
                            style={{ flex: 1, padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 16, minWidth: 200 }}
                        />
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            style={{ padding: 12, borderRadius: 8, background: '#111', color: 'white', border: '1px solid #333' }}
                        >
                            {RECORD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <button onClick={lookup} className="btn-primary" style={{ padding: '12px 24px' }}>
                            {loading ? "..." : "Lookup"}
                        </button>
                    </div>

                    {error && <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: 24 }}>{error}</div>}

                    {data && (
                        <div style={{ display: 'grid', gap: 16 }}>
                            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                                <div className="glass-card" style={{ flex: 1, padding: 20 }}>
                                    <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 4 }}>Status</div>
                                    <div style={{ fontSize: 18, color: data.Status === 0 ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
                                        {data.Status === 0 ? "NOERROR" : `Error ${data.Status}`}
                                    </div>
                                </div>
                                <div className="glass-card" style={{ flex: 1, padding: 20 }}>
                                    <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 4 }}>Time</div>
                                    <div style={{ fontSize: 18, color: 'white', fontWeight: 600 }}>
                                        {Date.now() - (data.Timestamp ? 0 : 0)} ms (est)
                                    </div>
                                </div>
                                <div className="glass-card" style={{ flex: 1, padding: 20 }}>
                                    <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 4 }}>Server</div>
                                    <div style={{ fontSize: 18, color: 'white', fontWeight: 600 }}>Cloudflare DoH</div>
                                </div>
                            </div>

                            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, color: 'white' }}>
                                    Answer Section
                                </div>
                                {data.Answer ? (
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ background: 'rgba(255,255,255,0.02)', textAlign: 'left', fontSize: 13, color: '#9ca3af' }}>
                                                <th style={{ padding: '12px 20px' }}>Name</th>
                                                <th style={{ padding: '12px 20px' }}>Type</th>
                                                <th style={{ padding: '12px 20px' }}>TTL</th>
                                                <th style={{ padding: '12px 20px' }}>Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.Answer.map((ans: any, i: number) => (
                                                <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <td style={{ padding: '12px 20px', color: 'white' }}>{ans.name}</td>
                                                    <td style={{ padding: '12px 20px', color: '#fb923c' }}>{RECORD_TYPES.find(t => t === type) || ans.type}</td>
                                                    <td style={{ padding: '12px 20px', color: '#9ca3af' }}>{ans.TTL}</td>
                                                    <td style={{ padding: '12px 20px', color: 'white', fontFamily: 'monospace' }}>{ans.data}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div style={{ padding: 32, textAlign: 'center', color: '#6b7280' }}>No records found for {type}.</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
