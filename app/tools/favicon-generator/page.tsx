"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Download } from "lucide-react";
import Link from "next/link";

export default function FaviconGenerator() {
    const [preview, setPreview] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [downloadUrl, setDownloadUrl] = useState("");

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                setPreview(img.src);
                generate(img);
            };
            img.src = ev.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const generate = (img: HTMLImageElement) => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // 32x32 standard favicon
        ctx.clearRect(0, 0, 32, 32);
        ctx.drawImage(img, 0, 0, 32, 32);

        const url = canvasRef.current.toDataURL("image/png");
        setDownloadUrl(url);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                        <div style={{ border: '2px dashed rgba(255,255,255,0.1)', borderRadius: 16, padding: 40, textAlign: 'center', marginBottom: 24, cursor: 'pointer' }} onClick={() => document.getElementById('favInput')?.click()}>
                            <input id="favInput" type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                            <ImageIcon size={48} color="#fb923c" style={{ marginBottom: 16 }} />
                            <div style={{ fontSize: 18, color: 'white', marginBottom: 8 }}>Upload Image</div>
                            <div style={{ fontSize: 14, color: '#9ca3af' }}>Recommended: 512x512 PNG</div>
                        </div>

                        {preview && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginTop: 40 }}>
                                <div style={{ display: 'flex', gap: 40 }}>
                                    <div>
                                        <div style={{ marginBottom: 8, fontSize: 13, color: '#9ca3af' }}>Original</div>
                                        <img src={preview} alt="Original" style={{ width: 64, height: 64, borderRadius: 8 }} />
                                    </div>
                                    <div>
                                        <div style={{ marginBottom: 8, fontSize: 13, color: '#9ca3af' }}>favicon.ico (32x32)</div>
                                        <canvas ref={canvasRef} width={32} height={32} style={{ width: 32, height: 32, border: '1px solid #333' }} />
                                    </div>
                                </div>

                                {downloadUrl && (
                                    <a href={downloadUrl} download="favicon.png" className="btn-primary" style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                                        <Download size={18} /> Download Favicon.png
                                    </a>
                                )}
                                <div style={{ fontSize: 12, color: '#6b7280' }}>* Currently generates 32x32 PNG favicons. Rename to .ico if needed for legacy support.</div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
