"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Layers } from "lucide-react";
import Link from "next/link";

export default function MetaGenerator() {
    const [data, setData] = useState({
        title: "",
        description: "",
        keywords: "",
        author: "",
        url: "",
        image: ""
    });
    const [code, setCode] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateCode();
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const generateCode = () => {
        let html = `<!-- Primary Meta Tags -->
<title>${data.title}</title>
<meta name="title" content="${data.title}" />
<meta name="description" content="${data.description}" />
<meta name="keywords" content="${data.keywords}" />
<meta name="author" content="${data.author}" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${data.url}" />
<meta property="og:title" content="${data.title}" />
<meta property="og:description" content="${data.description}" />
<meta property="og:image" content="${data.image}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${data.url}" />
<meta property="twitter:title" content="${data.title}" />
<meta property="twitter:description" content="${data.description}" />
<meta property="twitter:image" content="${data.image}" />`;

        setCode(html);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏷️</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>Meta Tag Generator</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Generate SEO-friendly meta tags for your website</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div className="glass-card" style={{ padding: 24, borderRadius: 20 }}>
                                <h3 style={{ color: 'white', fontWeight: 600, marginBottom: 16 }}>Website Details</h3>

                                <div style={{ display: 'grid', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Page Title</label>
                                        <input type="text" name="title" value={data.title} onChange={handleChange} placeholder="My Awesome Website" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: 8, color: 'white', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Description</label>
                                        <textarea name="description" value={data.description} onChange={handleChange} placeholder="A brief description of your site..." style={{ width: '100%', height: 80, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: 8, color: 'white', outline: 'none', resize: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Keywords (comma separated)</label>
                                        <input type="text" name="keywords" value={data.keywords} onChange={handleChange} placeholder="web, tools, dev" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: 8, color: 'white', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Author</label>
                                        <input type="text" name="author" value={data.author} onChange={handleChange} placeholder="Your Name" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: 8, color: 'white', outline: 'none' }} />
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card" style={{ padding: 24, borderRadius: 20 }}>
                                <h3 style={{ color: 'white', fontWeight: 600, marginBottom: 16 }}>Social Preview (OG & Twitter)</h3>
                                <div style={{ display: 'grid', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Website URL</label>
                                        <input type="text" name="url" value={data.url} onChange={handleChange} placeholder="https://example.com" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: 8, color: 'white', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Preview Image URL</label>
                                        <input type="text" name="image" value={data.image} onChange={handleChange} placeholder="https://example.com/og-image.jpg" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: 8, color: 'white', outline: 'none' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card" style={{ borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, color: '#fb923c' }}>Generated HTML</span>
                                <button onClick={copyToClipboard} className="btn-primary" style={{ padding: '6px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    {copied ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
                                    {copied ? 'Copied' : 'Copy HTML'}
                                </button>
                            </div>
                            <textarea
                                value={code}
                                readOnly
                                placeholder="Meta tags will appear here..."
                                style={{ flex: 1, minHeight: 400, background: 'transparent', border: 'none', padding: 24, color: '#4ade80', fontFamily: 'monospace', fontSize: 13, resize: 'none', outline: 'none', lineHeight: 1.6 }}
                            />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
