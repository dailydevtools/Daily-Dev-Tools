"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Image as ImageIcon, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ImageCompressor() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
    const [quality, setQuality] = useState(0.8);
    const [isProcessing, setIsProcessing] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        setOriginalFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewUrl(event.target?.result as string);
            compressImage(event.target?.result as string, quality, file.type);
        };
        reader.readAsDataURL(file);
    };

    const compressImage = (src: string, q: number, type: string) => {
        setIsProcessing(true);
        const img = new Image();
        img.src = src;
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.drawImage(img, 0, 0);

            // Default to jpeg if png (png doesn't support quality param in some browsers, but webp does)
            // Actually standard: image/jpeg or image/webp support quality. image/png does not.
            const outputType = type === 'image/png' ? 'image/jpeg' : type;

            canvas.toBlob(
                (blob) => {
                    setCompressedBlob(blob);
                    setIsProcessing(false);
                },
                outputType,
                q
            );
        };
    };

    // Re-compress when quality changes
    useEffect(() => {
        if (originalFile && previewUrl) {
            const timeout = setTimeout(() => {
                compressImage(previewUrl, quality, originalFile.type);
            }, 300); // Debounce
            return () => clearTimeout(timeout);
        }
    }, [quality]);

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Hidden Canvas */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {/* Navbar */}
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    {!originalFile ? (
                        <div className="glass-card" style={{
                            padding: 60,
                            textAlign: 'center',
                            border: '2px dashed rgba(255,255,255,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 24
                        }}>
                            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(249, 115, 22, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fb923c' }}>
                                <ImageIcon size={40} />
                            </div>
                            <div>
                                <h2 style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>Upload an Image</h2>
                                <p style={{ color: '#9ca3af' }}>JPG, PNG or WebP. We compress it locally.</p>
                            </div>
                            <label className="btn-primary" style={{ cursor: 'pointer', padding: '12px 32px' }}>
                                <Upload size={20} />
                                Select Image
                                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                            </label>
                        </div>
                    ) : (
                        <div className="glass-card" style={{ padding: 32 }}>
                            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>

                                {/* Preview */}
                                <div style={{ flex: 1, minWidth: 250 }}>
                                    <div style={{
                                        borderRadius: 12,
                                        overflow: 'hidden',
                                        background: '#000',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: 300
                                    }}>
                                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: 400 }} />
                                    </div>
                                </div>

                                {/* Controls */}
                                <div style={{ flex: 1, minWidth: 250 }}>
                                    <h2 style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 24 }}>Compression Settings</h2>

                                    <div style={{ marginBottom: 32 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                            <label style={{ color: '#9ca3af' }}>Quality</label>
                                            <span style={{ color: '#fb923c' }}>{Math.round(quality * 100)}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.1"
                                            max="1.0"
                                            step="0.05"
                                            value={quality}
                                            onChange={(e) => setQuality(Number(e.target.value))}
                                            style={{ width: '100%', cursor: 'pointer' }}
                                        />
                                    </div>

                                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <span style={{ color: '#9ca3af' }}>Original Size</span>
                                            <span style={{ color: 'white' }}>{formatSize(originalFile.size)}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#9ca3af' }}>Compressed Size</span>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ color: '#22c55e', fontWeight: 'bold', fontSize: 18 }}>
                                                    {compressedBlob ? formatSize(compressedBlob.size) : '...'}
                                                </div>
                                                {compressedBlob && (
                                                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                                                        Saving {Math.round((1 - compressedBlob.size / originalFile.size) * 100)}%
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: 12 }}>
                                        {compressedBlob && (
                                            <a
                                                href={URL.createObjectURL(compressedBlob)}
                                                download={`compressed-${originalFile.name}`}
                                                className="btn-primary"
                                                style={{ flex: 1, textAlign: 'center' }}
                                            >
                                                <Download size={18} />
                                                Download
                                            </a>
                                        )}
                                        <button
                                            onClick={() => { setOriginalFile(null); setCompressedBlob(null); }}
                                            className="btn-secondary"
                                        >
                                            <RefreshCw size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
