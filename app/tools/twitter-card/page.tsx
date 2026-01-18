"use client";

import { useState } from "react";
import { Twitter, Copy } from "lucide-react";
import Link from "next/link";

export default function TwitterCard() {
    const [cardType, setCardType] = useState("summary_large_image");
    const [site, setSite] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");

    const generate = () => {
        let code = "";
        code += `<meta name="twitter:card" content="${cardType}" />\n`;
        if (site) code += `<meta name="twitter:site" content="${site}" />\n`;
        if (title) code += `<meta name="twitter:title" content="${title}" />\n`;
        if (desc) code += `<meta name="twitter:description" content="${desc}" />\n`;
        if (image) code += `<meta name="twitter:image" content="${image}" />`;
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
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Card Type</label>
                                    <select value={cardType} onChange={e => setCardType(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, background: '#111', border: '1px solid #333', color: 'white' }}>
                                        <option value="summary">Summary</option>
                                        <option value="summary_large_image">Summary Large Image</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Site Handle (e.g. @twitter)</label>
                                    <input type="text" value={site} onChange={e => setSite(e.target.value)} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                                </div>
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
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                                <div style={{ padding: 12, background: 'rgba(255,255,255,0.05)', fontSize: 13, color: '#9ca3af', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Preview</div>
                                <div style={{ padding: 16, background: 'black', borderRadius: 16 }}>
                                    <div style={{
                                        border: '1px solid #333', borderRadius: 12, overflow: 'hidden',
                                        display: cardType === 'summary' ? 'flex' : 'block'
                                    }}>
                                        <div style={{
                                            width: cardType === 'summary' ? 120 : '100%',
                                            height: cardType === 'summary' ? 120 : 200,
                                            background: image ? `url(${image}) center/cover` : '#222',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555',
                                            flexShrink: 0
                                        }}>
                                            {!image && <Twitter size={32} />}
                                        </div>
                                        <div style={{ padding: 12, background: '#000', flex: 1 }}>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 4 }}>{title || "Card Title"}</div>
                                            <div style={{ fontSize: 13, color: '#8899a6', marginBottom: 4, maxHeight: 40, overflow: 'hidden' }}>{desc || "Description goes here..."}</div>
                                            <div style={{ fontSize: 12, color: '#8899a6' }}>Example.com</div>
                                        </div>
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
