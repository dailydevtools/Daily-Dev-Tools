"use client";

import { useState } from "react";
import { Share2, Copy } from "lucide-react";
import Link from "next/link";

export default function OgGenerator() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [type, setType] = useState("website");

    const generate = () => {
        let code = "";
        if (title) code += `<meta property="og:title" content="${title}" />\n`;
        if (desc) code += `<meta property="og:description" content="${desc}" />\n`;
        if (image) code += `<meta property="og:image" content="${image}" />\n`;
        if (url) code += `<meta property="og:url" content="${url}" />\n`;
        code += `<meta property="og:type" content="${type}" />`;
        return code;
    };

    const output = generate();

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                        <div className="glass-card" style={{ padding: 32 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Title</label>
                                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Description</label>
                                    <textarea value={desc} onChange={e => setDesc(e.target.value)} className="input-field" style={{ width: '100%', height: 80, padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', resize: 'vertical' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Image URL</label>
                                    <input type="text" value={image} onChange={e => setImage(e.target.value)} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Canonical URL</label>
                                    <input type="text" value={url} onChange={e => setUrl(e.target.value)} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Type</label>
                                    <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, background: '#111', border: '1px solid #333', color: 'white' }}>
                                        <option value="website">Website</option>
                                        <option value="article">Article</option>
                                        <option value="profile">Profile</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                                <div style={{ padding: 12, background: 'rgba(255,255,255,0.05)', fontSize: 13, color: '#9ca3af', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Preview (Facebook/LinkedIn)</div>
                                <div style={{ padding: 0, background: '#f0f2f5', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                                    <div style={{ width: '100%', height: 200, background: image ? `url(${image}) center/cover` : '#dfe3ee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b9dc3' }}>
                                        {!image && <Share2 size={48} />}
                                    </div>
                                    <div style={{ padding: 12, background: '#f0f2f5', borderTop: '1px solid #ddd' }}>
                                        <div style={{ fontSize: 12, color: '#606770', textTransform: 'uppercase' }}>{url ? new URL(url).hostname : 'EXAMPLE.COM'}</div>
                                        <div style={{ fontSize: 16, fontWeight: 600, color: '#1d2129', margin: '4px 0', lineHeight: 1.2 }}>{title || "Your Page Title"}</div>
                                        <div style={{ fontSize: 14, color: '#606770', lineHeight: 1.4, maxHeight: 40, overflow: 'hidden' }}>{desc || "A description of your page content goes here."}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card" style={{ padding: 0 }}>
                                <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', color: '#9ca3af', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Generated HTML</div>
                                <textarea readOnly value={output} style={{ width: '100%', height: 150, padding: 20, borderRadius: 0, background: 'transparent', border: 'none', color: '#fb923c', fontFamily: 'monospace', resize: 'none' }} />
                                <div style={{ padding: 12, textAlign: 'right', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary">Copy</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
