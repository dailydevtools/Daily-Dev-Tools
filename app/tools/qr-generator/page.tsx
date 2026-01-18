"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Download } from "lucide-react";
import Link from "next/link";

export default function QrGenerator() {
    const [text, setText] = useState("https://quickdevtools.com");
    const [qrDataUrl, setQrDataUrl] = useState("");
    const [color, setColor] = useState("#000000");
    const [bg, setBg] = useState("#ffffff");

    useEffect(() => {
        // Debounce to prevent too many requests
        const timer = setTimeout(() => {
            generateQr();
        }, 500);
        return () => clearTimeout(timer);
    }, [text, color, bg]);

    const generateQr = () => {
        if (!text) return;
        const cleanColor = color.replace('#', '');
        const cleanBg = bg.replace('#', '');
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(text)}&color=${cleanColor}&bgcolor=${cleanBg}`;
        setQrDataUrl(url);
    };

    const downloadQr = () => {
        const a = document.createElement("a");
        a.href = qrDataUrl;
        a.download = "qrcode.png";
        a.click();
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📱</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>QR Generator</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Create custom QR codes for any text or URL</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32 }}>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div className="glass-card" style={{ padding: 24, borderRadius: 20 }}>
                                <label style={{ display: 'block', color: '#fb923c', fontWeight: 500, marginBottom: 12 }}>Content</label>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="https://example.com"
                                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: 12, color: 'white', fontSize: 16, outline: 'none' }}
                                />
                            </div>

                            <div className="glass-card" style={{ padding: 24, borderRadius: 20 }}>
                                <h3 style={{ color: 'white', fontWeight: 600, marginBottom: 16 }}>Customization</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Foreground</label>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: 40, height: 40, borderRadius: 8, border: 'none', cursor: 'pointer' }} />
                                            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '0 12px', color: 'white' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Background</label>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} style={{ width: 40, height: 40, borderRadius: 8, border: 'none', cursor: 'pointer' }} />
                                            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '0 12px', color: 'white' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: 32, borderRadius: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ background: 'white', padding: 16, borderRadius: 16, marginBottom: 24 }}>
                                {qrDataUrl && <img src={qrDataUrl} alt="QR Code" style={{ width: 240, height: 240, display: 'block' }} />}
                            </div>
                            <button onClick={downloadQr} className="btn-primary" style={{ padding: '12px 32px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                <Download style={{ width: 18, height: 18 }} /> Download
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
