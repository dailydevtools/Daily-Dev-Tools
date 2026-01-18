"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Download } from "lucide-react";
import Link from "next/link";

export default function SvgToPng() {
    const [svgContent, setSvgContent] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [downloadUrl, setDownloadUrl] = useState("");
    const [error, setError] = useState("");

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "image/svg+xml") {
            setError("Please upload a valid SVG file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            setSvgContent(ev.target?.result as string);
            process(ev.target?.result as string);
        };
        reader.readAsText(file);
    };

    const process = (svgStr: string) => {
        setError("");
        try {
            // Create an image from SVG blob
            const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            const img = new Image();
            img.onload = () => {
                if (!canvasRef.current) return;
                const ctx = canvasRef.current.getContext('2d');
                if (!ctx) return;

                const scale = 2; // High res
                canvasRef.current.width = img.width * scale;
                canvasRef.current.height = img.height * scale;

                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);

                const pngUrl = canvasRef.current.toDataURL("image/png");
                setDownloadUrl(pngUrl);
                URL.revokeObjectURL(url);
            };
            img.onerror = () => {
                setError("Failed to render SVG. Ensure it is valid XML.");
            };
            img.src = url;

        } catch (e) {
            setError("Error processing SVG.");
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                        <div style={{ border: '2px dashed rgba(255,255,255,0.1)', borderRadius: 16, padding: 40, textAlign: 'center', marginBottom: 24, cursor: 'pointer' }} onClick={() => document.getElementById('svgInput')?.click()}>
                            <input id="svgInput" type="file" accept=".svg" onChange={handleFile} style={{ display: 'none' }} />
                            <ImageIcon size={48} color="#fb923c" style={{ marginBottom: 16 }} />
                            <div style={{ fontSize: 18, color: 'white', marginBottom: 8 }}>Upload SVG File</div>
                            <div style={{ fontSize: 14, color: '#9ca3af' }}>or click to browse</div>
                        </div>

                        <div style={{ marginBottom: 24 }}>
                            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>...or paste SVG Code</div>
                            <textarea
                                value={svgContent} onChange={e => { setSvgContent(e.target.value); process(e.target.value); }}
                                placeholder="<svg>...</svg>"
                                style={{ width: '100%', height: 100, padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: 'monospace' }}
                            />
                        </div>

                        {error && <div style={{ color: '#ef4444', marginBottom: 20 }}>{error}</div>}

                        <div style={{ marginTop: 20, display: downloadUrl ? 'block' : 'none' }}>
                            <div style={{ marginBottom: 12, fontSize: 13, color: '#9ca3af' }}>PNG Preview (2x Scale)</div>
                            <canvas ref={canvasRef} style={{ maxWidth: '100%', border: '1px solid rgba(255,255,255,0.1)', background: 'repeating-conic-gradient(#111 0% 25%, #222 0% 50%) 50% / 20px 20px', borderRadius: 8 }} />

                            <div style={{ marginTop: 24 }}>
                                <a href={downloadUrl} download="converted.png" className="btn-primary" style={{ padding: '12px 32px', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                                    <Download size={18} /> Download PNG
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
