"use client";

import { useState } from "react";
import { Link as LinkIcon, Copy } from "lucide-react";
import Link from "next/link";

export default function UtmBuilder() {
    const [url, setUrl] = useState("");
    const [source, setSource] = useState("");
    const [medium, setMedium] = useState("");
    const [campaign, setCampaign] = useState("");
    const [term, setTerm] = useState("");
    const [content, setContent] = useState("");

    const build = () => {
        if (!url) return "";
        try {
            const u = new URL(url);
            if (source) u.searchParams.set("utm_source", source);
            if (medium) u.searchParams.set("utm_medium", medium);
            if (campaign) u.searchParams.set("utm_campaign", campaign);
            if (term) u.searchParams.set("utm_term", term);
            if (content) u.searchParams.set("utm_content", content);
            return u.toString();
        } catch (e) {
            return "Invalid URL";
        }
    };

    const result = build();

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Website URL (Required)</label>
                                <input
                                    type="text" value={url} onChange={e => setUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Campaign Source (Required)</label>
                                    <input
                                        type="text" value={source} onChange={e => setSource(e.target.value)}
                                        placeholder="google, newsletter"
                                        className="input-field"
                                        style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Campaign Medium (Required)</label>
                                    <input
                                        type="text" value={medium} onChange={e => setMedium(e.target.value)}
                                        placeholder="cpc, banner, email"
                                        className="input-field"
                                        style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Campaign Name (Required)</label>
                                    <input
                                        type="text" value={campaign} onChange={e => setCampaign(e.target.value)}
                                        placeholder="summer_sale"
                                        className="input-field"
                                        style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Campaign Term (Optional)</label>
                                    <input
                                        type="text" value={term} onChange={e => setTerm(e.target.value)}
                                        placeholder="running+shoes"
                                        className="input-field"
                                        style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Campaign Content (Optional)</label>
                                    <input
                                        type="text" value={content} onChange={e => setContent(e.target.value)}
                                        placeholder="logolink, textlink"
                                        className="input-field"
                                        style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                    />
                                </div>
                            </div>

                            <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16, marginTop: 12 }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Generated URL</div>
                                <div style={{ marginBottom: 24, wordBreak: 'break-all', color: '#fb923c', fontSize: 16, fontFamily: 'monospace' }}>
                                    {result || "..."}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <button onClick={() => navigator.clipboard.writeText(result)} className="btn-secondary" disabled={!url} style={{ opacity: !url ? 0.5 : 1 }}>
                                        <Copy size={16} style={{ marginRight: 8 }} /> Copy URL
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
