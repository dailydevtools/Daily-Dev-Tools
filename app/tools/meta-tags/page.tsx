"use client";

import { useState } from "react";
import { Code, Copy } from "lucide-react";
import Link from "next/link";

export default function MetaTags() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [keywords, setKeywords] = useState("");
    const [author, setAuthor] = useState("");

    const generate = () => {
        let code = "";
        if (title) code += `<title>${title}</title>\n`;
        if (desc) code += `<meta name="description" content="${desc}">\n`;
        if (keywords) code += `<meta name="keywords" content="${keywords}">\n`;
        if (author) code += `<meta name="author" content="${author}">\n`;

        code += `<meta name="viewport" content="width=device-width, initial-scale=1.0">`;
        return code;
    };

    const output = generate();

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#9ca3af' }}>
                                    <span>Page Title</span>
                                    <span>{title.length}/60</span>
                                </div>
                                <input
                                    type="text" value={title} onChange={e => setTitle(e.target.value)}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#9ca3af' }}>
                                    <span>Description</span>
                                    <span>{desc.length}/160</span>
                                </div>
                                <textarea
                                    value={desc} onChange={e => setDesc(e.target.value)}
                                    className="input-field"
                                    style={{ width: '100%', height: 80, padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', resize: 'vertical' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Keywords (comma separated)</label>
                                <input
                                    type="text" value={keywords} onChange={e => setKeywords(e.target.value)}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Author</label>
                                <input
                                    type="text" value={author} onChange={e => setAuthor(e.target.value)}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>

                            <div style={{ position: 'relative', marginTop: 12 }}>
                                <textarea
                                    readOnly
                                    value={output}
                                    style={{ width: '100%', height: 200, padding: 20, borderRadius: 12, background: '#111', border: 'none', color: '#fb923c', fontFamily: 'monospace', resize: 'none' }}
                                />
                                <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary" style={{ position: 'absolute', top: 12, right: 12 }}>
                                    <Copy size={16} />
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
