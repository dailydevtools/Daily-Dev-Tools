"use client";

import { useState } from "react";
import { Image as ImageIcon, FileText } from "lucide-react";
import Link from "next/link";

export default function ImageBase64() {
    const [base64, setBase64] = useState("");
    const [preview, setPreview] = useState("");
    const [mode, setMode] = useState<"toBase64" | "toImage">("toBase64");

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const res = ev.target?.result as string;
            setBase64(res);
            setPreview(res);
        };
        reader.readAsDataURL(file);
    };

    const handleBase64Input = (val: string) => {
        setBase64(val);
        if (val.startsWith("data:image")) {
            setPreview(val);
        } else {
            // Try to guess prefix if missing
            // simplified
            setPreview(`data:image/png;base64,${val}`);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 12, display: 'flex', gap: 4 }}>
                            <button onClick={() => { setMode("toBase64"); setBase64(""); }} style={{ padding: '8px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', background: mode === 'toBase64' ? '#fb923c' : 'transparent', color: mode === 'toBase64' ? 'black' : '#9ca3af', fontWeight: 500 }}>Image to Base64</button>
                            <button onClick={() => { setMode("toImage"); setBase64(""); }} style={{ padding: '8px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', background: mode === 'toImage' ? '#fb923c' : 'transparent', color: mode === 'toImage' ? 'black' : '#9ca3af', fontWeight: 500 }}>Base64 to Image</button>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: 40 }}>
                        {mode === 'toBase64' ? (
                            <div>
                                <div style={{ border: '2px dashed rgba(255,255,255,0.1)', borderRadius: 16, padding: 40, textAlign: 'center', marginBottom: 24, cursor: 'pointer' }} onClick={() => document.getElementById('fileInput')?.click()}>
                                    <input id="fileInput" type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                                    <ImageIcon size={48} color="#fb923c" style={{ marginBottom: 16 }} />
                                    <div style={{ fontSize: 18, color: 'white', marginBottom: 8 }}>Click to upload image</div>
                                    <div style={{ fontSize: 14, color: '#9ca3af' }}>JPG, PNG, GIF, SVG, WebP</div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Paste Base64 String</label>
                                <textarea
                                    value={base64} onChange={e => handleBase64Input(e.target.value)}
                                    placeholder="data:image/png;base64,..."
                                    style={{ width: '100%', height: 150, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, color: 'white', resize: 'vertical' }}
                                />
                            </div>
                        )}

                        {base64 && (
                            <div style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <div style={{ fontSize: 13, color: '#9ca3af' }}>Preview</div>
                                        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'repeating-conic-gradient(#111 0% 25%, #222 0% 50%) 50% / 20px 20px' }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={preview} alt="Preview" style={{ width: '100%', display: 'block' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Base64 Result</div>
                                        <textarea
                                            readOnly
                                            value={base64}
                                            style={{ width: '100%', height: 200, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, color: '#fb923c', resize: 'none' }}
                                        />
                                        <div style={{ marginTop: 12, textAlign: 'right' }}>
                                            <button onClick={() => navigator.clipboard.writeText(base64)} className="btn-secondary">Copy Base64</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
