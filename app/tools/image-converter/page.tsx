"use client";

import { useState } from "react";
import { Upload, FileImage, Download, RefreshCw } from "lucide-react";
import Link from "next/link";

interface ConvertedFile {
    originalName: string;
    blob: Blob;
    url: string;
    format: string;
    size: number;
}

export default function ImageConverter() {
    const [files, setFiles] = useState<FileList | null>(null);
    const [format, setFormat] = useState("image/webp");
    const [quality, setQuality] = useState(0.8);
    const [results, setResults] = useState<ConvertedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(e.target.files);
            setResults([]); // Clear previous
        }
    };

    const convert = async () => {
        if (!files) return;
        setIsProcessing(true);
        setResults([]);
        const newResults: ConvertedFile[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                const blob = await processFile(file, format, quality);
                newResults.push({
                    originalName: file.name,
                    blob,
                    url: URL.createObjectURL(blob),
                    format: format.split('/')[1],
                    size: blob.size
                });
            } catch (e) {
                console.error("Failed to convert", file.name, e);
            }
        }
        setResults(newResults);
        setIsProcessing(false);
    };

    const processFile = (file: File, type: string, q: number): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) return reject("No context");

                // Handle transparency for JPEG (white background)
                if (type === "image/jpeg") {
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                ctx.drawImage(img, 0, 0);
                canvas.toBlob(
                    (blob) => {
                        if (blob) resolve(blob);
                        else reject("Conversion failed");
                    },
                    type,
                    q
                );
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center', marginBottom: 24 }}>
                        <div style={{ marginBottom: 24 }}>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="btn-primary"
                                style={{ padding: '16px 32px', fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                            >
                                <Upload size={20} />
                                Select Images
                            </label>
                            <p style={{ marginTop: 12, color: '#9ca3af', fontSize: 13 }}>
                                Supports PNG, JPG, WEBP, AVIF. Processed locally.
                            </p>
                        </div>

                        {files && files.length > 0 && (
                            <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 12, textAlign: 'left' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 24, alignItems: 'center' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#9ca3af' }}>Format</label>
                                        <select
                                            value={format}
                                            onChange={e => setFormat(e.target.value)}
                                            className="input-field"
                                            style={{ padding: 10, borderRadius: 8, minWidth: 120, background: '#111', color: 'white', border: '1px solid #333' }}
                                        >
                                            <option value="image/webp">WebP</option>
                                            <option value="image/jpeg">JPEG</option>
                                            <option value="image/png">PNG</option>
                                            {/* AVIF support depends on browser */}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#9ca3af' }}>Quality ({Math.round(quality * 100)}%)</label>
                                        <input
                                            type="range" min="0.1" max="1" step="0.1"
                                            value={quality} onChange={e => setQuality(Number(e.target.value))}
                                            style={{ width: 150 }}
                                        />
                                    </div>
                                    <div style={{ flex: 1, textAlign: 'right' }}>
                                        <button
                                            onClick={convert}
                                            disabled={isProcessing}
                                            className="btn-primary"
                                            style={{ padding: '10px 24px', opacity: isProcessing ? 0.7 : 1 }}
                                        >
                                            {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : "Convert All"}
                                        </button>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
                                    {results.length > 0 ? (
                                        <div style={{ display: 'grid', gap: 12 }}>
                                            {results.map((res, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: 8 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                        <div style={{ width: 40, height: 40, background: '#111', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <FileImage size={20} color="#fb923c" />
                                                        </div>
                                                        <div>
                                                            <div style={{ color: 'white', fontSize: 14 }}>{res.originalName}</div>
                                                            <div style={{ color: '#9ca3af', fontSize: 12 }}>
                                                                {formatSize(res.size)} • {res.format.toUpperCase()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={res.url}
                                                        download={`converted_${i}.${res.format}`}
                                                        className="btn-secondary"
                                                        style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
                                                    >
                                                        <Download size={14} /> Download
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div style={{ color: '#6b7280', fontSize: 14, textAlign: 'center' }}>
                                            {files.length} file(s) selected. Ready to convert.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
