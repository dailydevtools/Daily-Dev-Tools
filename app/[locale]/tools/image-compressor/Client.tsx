"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Image as ImageIcon, RefreshCw } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function ImageCompressorClient() {
    const t = useTranslations('ImageCompressor');
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
        <main className="relative min-h-screen">
            {/* Hidden Canvas */}
            <canvas ref={canvasRef} className="hidden" />

            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title="Image Compressor"
                        description="Compress images locally without uploading to server."
                        icon={<ImageIcon size={28} className="text-[#fb923c]" />}
                    />

                    {!originalFile ? (
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-[60px] text-center border-2 border-dashed border-white/10 flex flex-col items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-[#f97316]/10 flex items-center justify-center text-[#fb923c]">
                                <ImageIcon size={40} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">{t('uploadTitle')}</h2>
                                <p className="text-[#9ca3af]">{t('uploadDesc')}</p>
                            </div>
                            <label className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] cursor-pointer py-3 px-8 flex items-center gap-2">
                                <Upload size={20} />
                                {t('selectImage')}
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            </label>
                        </div>
                    ) : (
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">
                            <div className="flex gap-8 flex-wrap">

                                {/* Preview */}
                                <div className="flex-1 min-w-[250px]">
                                    <div className="rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center min-h-[300px]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={previewUrl} alt="Preview" className="max-w-full max-h-[400px]" />
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex-1 min-w-[250px]">
                                    <h2 className="text-xl font-bold text-white mb-6">{t('settings')}</h2>

                                    <div className="mb-8">
                                        <div className="flex justify-between mb-3">
                                            <label className="text-[#9ca3af]">{t('quality')}</label>
                                            <span className="text-[#fb923c]">{Math.round(quality * 100)}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.1"
                                            max="1.0"
                                            step="0.05"
                                            value={quality}
                                            onChange={(e) => setQuality(Number(e.target.value))}
                                            className="w-full cursor-pointer accent-[#fb923c]"
                                        />
                                    </div>

                                    <div className="bg-black/30 rounded-xl p-5 mb-6">
                                        <div className="flex justify-between mb-3 pb-3 border-b border-white/5">
                                            <span className="text-[#9ca3af]">{t('originalSize')}</span>
                                            <span className="text-white">{formatSize(originalFile.size)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#9ca3af]">{t('compressedSize')}</span>
                                            <div className="text-right">
                                                <div className="text-[#22c55e] font-bold text-lg">
                                                    {compressedBlob ? formatSize(compressedBlob.size) : '...'}
                                                </div>
                                                {compressedBlob && (
                                                    <div className="text-xs text-[#6b7280]">
                                                        {t('saving')} {Math.round((1 - compressedBlob.size / originalFile.size) * 100)}%
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        {compressedBlob && (
                                            <a
                                                href={URL.createObjectURL(compressedBlob)}
                                                download={`compressed-${originalFile.name}`}
                                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] flex-1 text-center flex items-center justify-center gap-2"
                                            >
                                                <Download size={18} />
                                                {t('download')}
                                            </a>
                                        )}
                                        <button
                                            onClick={() => { setOriginalFile(null); setCompressedBlob(null); }}
                                            className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] p-3"
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
        </main>
    );
}
