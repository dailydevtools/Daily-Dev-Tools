"use client";

import { useState } from "react";
import { Download, Search, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function YTThumbnail() {
    const [url, setUrl] = useState("");
    const [videoId, setVideoId] = useState("");
    const [error, setError] = useState("");

    const extractId = () => {
        try {
            if (!url) { setError("Please enter a URL"); return; }
            // Regex for various YT formats
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            if (match && match[2].length === 11) {
                setVideoId(match[2]);
                setError("");
            } else {
                setVideoId("");
                setError("Invalid YouTube URL");
            }
        } catch (e) {
            setError("Error parsing URL");
        }
    };

    const ThumbCard = ({ label, quality }: { label: string, quality: string }) => {
        const src = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;

        return (
            <div className="glass-card" style={{ padding: 16, overflow: 'hidden' }}>
                <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: 'white' }}>{label}</span>
                    <a href={src} download={`thumbnail_${quality}.jpg`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '6px 12px', fontSize: 13 }}>
                        <Download size={14} style={{ marginRight: 6 }} /> Download
                    </a>
                </div>
                <div style={{ borderRadius: 8, overflow: 'hidden', background: '#000', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={src} alt={label} style={{ width: '100%', height: 'auto' }} />
                </div>
            </div>
        );
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
                        <div className="glass" style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <Search color="#9ca3af" size={20} />
                            <input
                                type="text"
                                placeholder="Paste YouTube Video URL..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && extractId()}
                                style={{ width: '100%', height: 56, background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: 16 }}
                            />
                        </div>
                        <button onClick={extractId} className="btn-primary" style={{ padding: '0 32px' }}>
                            Get Thumbnails
                        </button>
                    </div>

                    {error && (
                        <div style={{ textAlign: 'center', color: '#ef4444', marginBottom: 20 }}>{error}</div>
                    )}

                    {!videoId && !error && (
                        <div style={{ textAlign: 'center', color: '#6b7280', padding: 40 }}>
                            <ImageIcon size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                            <p>Get high-quality thumbnails from any YouTube video instantly.</p>
                        </div>
                    )}

                    {videoId && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <ThumbCard label="HD (1280x720)" quality="maxresdefault" />
                            <ThumbCard label="SD (640x480)" quality="sddefault" />
                            <ThumbCard label="HQ (480x360)" quality="hqdefault" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
